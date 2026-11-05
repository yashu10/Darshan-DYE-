export interface SiteImage {
  src: string;
  width: number;
  height: number;
}

const img = (file: string, width: number, height: number): SiteImage => ({ src: `/assets/img/${file}`, width, height });

/** Photos used on the pages, with their real pixel size (keeps the layout from shifting while they load). */
export const IMAGES = {
  powderBowls: img("powder-bowls.jpg", 1200, 800),
  textile: img("textile.jpg", 1200, 800),
  powders: img("powders.jpg", 1200, 1758),
  labPurple: img("lab-purple.jpg", 1200, 800),
  labPipette: img("lab-pipette.jpg", 1200, 1800),
  labBeaker: img("lab-beaker.jpg", 1200, 800),
  labScientist: img("lab-scientist.jpg", 1200, 800),
  dyeIndigo: img("dye-indigo.jpg", 1200, 1500),
  dyeSilk: img("dye-silk.jpg", 1400, 933),
  dyeTiedye: img("dye-tiedye.jpg", 1200, 1800),
  founder: img("girish-patel.jpg", 1000, 1333)
} as const;
