"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { DYES, type ColourGroup, type Dye, type DyeFamily } from "@/data/dyes";
import { ROUTES } from "@/data/site";
import {
  COLOUR_GROUPS,
  COLOUR_GROUP_DOT,
  FAMILY_LABEL,
  displayRating,
  dyeReference,
  leadingRating,
  normalise,
  ratingBarPercent,
  readableInk,
  searchKey,
  shadeCardPageUrl
} from "@/lib/dyes";

const PAGE_SIZE = 48;

type FamilyFilter = "all" | DyeFamily;
type GroupFilter = "all" | ColourGroup;

const FAMILY_FILTERS: readonly { value: FamilyFilter; label: string }[] = [
  { value: "all", label: "All dyes" },
  { value: "acid", label: "Acid dyes" },
  { value: "direct", label: "Direct dyes" }
];

const LIGHT_FASTNESS_OPTIONS: readonly { value: number; label: string }[] = [
  { value: 0, label: "Any light fastness" },
  { value: 4, label: "Light fastness 4 and above" },
  { value: 5, label: "Light fastness 5 and above" },
  { value: 6, label: "Light fastness 6 and above" }
];

/** What each dye is matched against when searching, computed once. */
const SEARCH_KEYS = new Map(DYES.map((dye) => [dye.id, searchKey(dye)]));

const parseFamily = (value: string | null): FamilyFilter => (value === "acid" || value === "direct" ? value : "all");
const parseGroup = (value: string | null): GroupFilter => COLOUR_GROUPS.find((group) => group === value) ?? "all";

/**
 * Searchable catalogue of every dye in the shade cards.
 *
 * All dyes are part of the server-rendered HTML (so search engines and AI crawlers can read every name,
 * C.I. number and rating). Cards beyond the first page, or filtered out, only carry the `hidden` attribute.
 */
export function ShadeExplorer() {
  const [family, setFamily] = useState<FamilyFilter>("all");
  const [group, setGroup] = useState<GroupFilter>("all");
  const [query, setQuery] = useState("");
  const [minLight, setMinLight] = useState(0);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Dye | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const matches = useMemo(() => {
    const terms = normalise(query).split(" ").filter(Boolean);
    return DYES.filter(
      (dye) =>
        (family === "all" || dye.family === family) &&
        (group === "all" || dye.colourGroup === group) &&
        (!minLight || leadingRating(dye.light) >= minLight) &&
        terms.every((term) => SEARCH_KEYS.get(dye.id)?.includes(term))
    );
  }, [family, group, query, minLight]);

  const visibleIds = useMemo(() => new Set(matches.slice(0, shown).map((dye) => dye.id)), [matches, shown]);
  const visibleCount = Math.min(shown, matches.length);

  /** Any filter change starts again from the first page of results. */
  const changeFilter = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setShown(PAGE_SIZE);
  };

  const applyUrlFilters = useCallback((nextFamily: FamilyFilter, nextGroup: GroupFilter) => {
    setFamily(nextFamily);
    setGroup(nextGroup);
    setShown(PAGE_SIZE);
  }, []);

  const resetFilters = () => {
    setFamily("all");
    setGroup("all");
    setQuery("");
    setMinLight(0);
    setShown(PAGE_SIZE);
  };

  const openDetails = useCallback((dye: Dye) => {
    setSelected(dye);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  return (
    <section className="ex" id="explorer">
      <Suspense fallback={null}>
        <UrlFilterSync onFilters={applyUrlFilters} />
      </Suspense>
      <div className="wrap">
        <SectionHead
          title="Shade explorer"
          description={`Search all ${DYES.length} shades from our Acid and Direct dye cards. Filter by colour, see each dye at 0.5% and 2.0% depth, and check its fastness ratings.`}
        />

        <div className="ex-bar reveal">
          <label className="sr-only" htmlFor="exQ">
            Search dyes
          </label>
          <input
            id="exQ"
            type="search"
            placeholder="Search by name or C.I. number, e.g. Yellow 42"
            autoComplete="off"
            value={query}
            onChange={(event) => changeFilter(setQuery)(event.target.value)}
          />
          <label className="sr-only" htmlFor="exLight">
            Minimum light fastness
          </label>
          <select id="exLight" value={minLight} onChange={(event) => changeFilter(setMinLight)(Number(event.target.value))}>
            {LIGHT_FASTNESS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ex-chips" role="group" aria-label="Dye family">
          {FAMILY_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              className="xchip"
              aria-pressed={family === option.value}
              onClick={() => changeFilter(setFamily)(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="ex-chips" role="group" aria-label="Colour">
          <button type="button" className="xchip" aria-pressed={group === "all"} onClick={() => changeFilter(setGroup)("all")}>
            All colours
          </button>
          {COLOUR_GROUPS.map((option) => (
            <button
              key={option}
              type="button"
              className="xchip"
              aria-pressed={group === option}
              onClick={() => changeFilter(setGroup)(option)}
            >
              <i className="gdot" style={{ background: COLOUR_GROUP_DOT[option] }} />
              {option}
            </button>
          ))}
        </div>

        <div className="ex-meta">
          <span aria-live="polite">
            Showing {visibleCount} of {matches.length} shade{matches.length === 1 ? "" : "s"}
          </span>
          <button type="button" onClick={resetFilters}>
            Clear filters
          </button>
        </div>

        <div className="ex-grid">
          {DYES.map((dye) => (
            <DyeCard key={dye.id} dye={dye} hidden={!visibleIds.has(dye.id)} onOpen={openDetails} />
          ))}
        </div>
        {matches.length === 0 ? (
          <p className="ex-empty">No shades match. Try a different name, colour or fastness filter.</p>
        ) : null}
        {matches.length > shown ? (
          <div className="ex-more">
            <button type="button" className="btn btn-navy" onClick={() => setShown((count) => count + PAGE_SIZE)}>
              Show more shades
            </button>
          </div>
        ) : null}
        <p className="sc-note note--spaced">
          Colours are scanned from our printed shade cards and may differ slightly on your screen. Ratings and names are as printed on
          the cards. Request a sample to confirm any shade.
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="ex-dlg"
        aria-labelledby="exDlgTitle"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <button type="button" className="dlg-x" aria-label="Close" onClick={() => dialogRef.current?.close()}>
          &times;
        </button>
        <div className="dlg-body">{selected ? <DyeDetails dye={selected} /> : null}</div>
      </dialog>
    </section>
  );
}

/**
 * Applies ?f=acid|direct and ?c=<colour> from the address (links in the footer and on the home page).
 * Lives in its own Suspense boundary because reading the query string is client-only.
 */
function UrlFilterSync({ onFilters }: { onFilters: (family: FamilyFilter, group: GroupFilter) => void }) {
  const params = useSearchParams();
  const familyParam = params.get("f");
  const groupParam = params.get("c");

  useEffect(() => {
    onFilters(parseFamily(familyParam), parseGroup(groupParam));
  }, [familyParam, groupParam, onFilters]);

  return null;
}

interface DyeCardProps {
  dye: Dye;
  hidden: boolean;
  onOpen: (dye: Dye) => void;
}

const DyeCard = memo(function DyeCard({ dye, hidden, onOpen }: DyeCardProps) {
  return (
    <button
      type="button"
      className="dye"
      hidden={hidden}
      aria-label={`${dye.name}, ${dye.ci || "mix"}. Open details`}
      onClick={() => onOpen(dye)}
    >
      <span className="dye-sw">
        <i style={{ background: dye.swatch05, color: readableInk(dye.swatch05) }}>
          <em>0.5%</em>
        </i>
        <i style={{ background: dye.swatch20, color: readableInk(dye.swatch20) }}>
          <em>2.0%</em>
        </i>
      </span>
      <span className="dye-b">
        <span className={`dye-fam ${dye.family}`}>{FAMILY_LABEL[dye.family]}</span>
        <b>{dye.name}</b>
        <small>{dye.ci || " "}</small>
        <span className="dye-r">
          <span title="Light fastness">L {displayRating(dye.light)}</span>
          <span title="Washing fastness">W {displayRating(dye.wash)}</span>
          <span title="Perspiration fastness">P {displayRating(dye.perspiration)}</span>
        </span>
      </span>
    </button>
  );
});

const RATING_ROWS: readonly { label: string; read: (dye: Dye) => string; scaleMax: number }[] = [
  { label: "Light", read: (dye) => dye.light, scaleMax: 8 },
  { label: "Washing", read: (dye) => dye.wash, scaleMax: 5 },
  { label: "Perspiration", read: (dye) => dye.perspiration, scaleMax: 5 },
  { label: "Milling", read: (dye) => dye.milling, scaleMax: 5 }
];

function DyeDetails({ dye }: { dye: Dye }) {
  const substrate = dye.family === "acid" ? "nylon" : "cotton";
  const enquiry = `Please send price and a sample for ${dyeReference(dye)} from your ${FAMILY_LABEL[dye.family]} Dyes shade card.`;

  return (
    <>
      <div className="dlg-sw">
        <div style={{ background: dye.swatch05, color: readableInk(dye.swatch05) }}>
          <span>0.5%</span>
        </div>
        <div style={{ background: dye.swatch20, color: readableInk(dye.swatch20) }}>
          <span>2.0%</span>
        </div>
      </div>
      <span className={`dye-fam ${dye.family}`}>
        {FAMILY_LABEL[dye.family]} dye · shade on {substrate}
      </span>
      <h3 id="exDlgTitle">{dye.name}</h3>
      <p className="dlg-ci">{dye.ci ? <>C.I. generic name: <b>{dye.ci}</b></> : "Mixed / matching shade"}</p>
      <table className="dlg-t">
        <caption className="sr-only">Fastness ratings</caption>
        <tbody>
          {RATING_ROWS.map(({ label, read, scaleMax }) => {
            const rating = read(dye);
            const percent = ratingBarPercent(rating, scaleMax);
            return (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{displayRating(rating)}</td>
                <td>
                  {percent === null ? null : (
                    <span className="bar">
                      <span style={{ width: `${percent}%` }} />
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="sc-note">
        Ratings are as printed on our shade card (PDF page {dye.pdfPage}). Colours are scanned and may differ slightly on screen.
        Request a sample to confirm the shade.
      </p>
      <div className="dlg-act">
        <Link className="btn btn-amber" href={`${ROUTES.contact}?msg=${encodeURIComponent(enquiry)}`}>
          Request price &amp; sample
        </Link>
        <a className="btn btn-navy" href={shadeCardPageUrl(dye)} target="_blank" rel="noopener">
          See on shade card
        </a>
      </div>
    </>
  );
}
