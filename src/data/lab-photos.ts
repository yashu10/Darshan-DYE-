export interface LabPhoto {
  /** File name inside public/assets/img/lab. */
  file: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
}

/**
 * Photos of the laboratory. The About page collage places them by position
 * (see `.lab-collage` in globals.css), so keep this order.
 */
export const LAB_PHOTOS: readonly LabPhoto[] = [
  { file: "lab-1.jpg", width: 1280, height: 960, caption: "Laboratory and meeting area", alt: "Spacious laboratory with a meeting table, dyeing machines and workbenches" },
  { file: "lab-2.jpg", width: 1280, height: 960, caption: "Quality control computer station", alt: "Computer, printer and label printer at the quality control desk" },
  { file: "lab-3.jpg", width: 960, height: 1280, caption: "Dyeing laboratory bench", alt: "Long laboratory bench with a drying oven and sample shelves" },
  { file: "lab-4.jpg", width: 960, height: 1280, caption: "Laboratory workbench and sample shelves", alt: "Laboratory workbench with beakers and dye samples on shelves" },
  { file: "lab-5.jpg", width: 960, height: 1280, caption: "Laboratory and discussion table", alt: "Discussion table in front of the laboratory benches" },
  { file: "lab-6.jpg", width: 1280, height: 960, caption: "Laboratory overview", alt: "Overview of the laboratory with benches and sample containers" },
  { file: "lab-7.jpg", width: 1280, height: 960, caption: "Laboratory dyeing machines and oven", alt: "Laboratory dyeing machines and a drying oven on the workbench" },
  { file: "lab-8.jpg", width: 1280, height: 960, caption: "Colour matching desk", alt: "Computer desk used for colour matching and records" },
  { file: "lab-9.jpg", width: 1280, height: 960, caption: "Quality control desk", alt: "Quality control desk with instrument, computer and sample beakers" }
];

/** Positions in LAB_PHOTOS shown on the Home page (the first one is displayed wide). */
export const HOME_LAB_PHOTO_INDEXES = [0, 6, 2, 5, 8] as const;
