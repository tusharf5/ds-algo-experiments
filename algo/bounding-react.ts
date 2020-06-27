let bounds: Record<"tr" | "tl" | "br" | "bl", [number, number]> = {
  tr: [1, 1],
  tl: [-1, 1],
  br: [1, -1],
  bl: [-1, -1],
};

function isInside([x, y]: [number, number]):
  | boolean
  | "tr"
  | "tl"
  | "br"
  | "bl" {
  if (x >= bounds["tr"][0] || y >= bounds["tr"][1]) {
    return "tr";
  }

  if (x <= bounds["tl"][0] || y >= bounds["tl"][1]) {
    return "tl";
  }

  if (x >= bounds["br"][0] || y <= bounds["br"][1]) {
    return "br";
  }

  if (x <= bounds["bl"][0] || y <= bounds["bl"][1]) {
    return "bl";
  }

  return true;
}

function computeNewBoundingRect(
  plane: "tr" | "tl" | "br" | "bl",
  cdn: [number, number],
  boundingRect: Record<"tr" | "tl" | "br" | "bl", [number, number]>
): Record<"tr" | "tl" | "br" | "bl", [number, number]> {
  if (plane === "tl") {
    const newTLX = Math.min(boundingRect.tl[0], cdn[0]);
    const newTLY = Math.max(boundingRect.tl[1], cdn[1]);
    const newTRY = Math.max(boundingRect.tr[1], cdn[1]);
    const newBLX = newTLX;
    return {
      ...boundingRect,
      tl: [newTLX, newTLY],
      tr: [boundingRect.tr[0], newTRY],
      bl: [newBLX, boundingRect.br[1]],
    };
  }
  if (plane === "tr") {
    const newTRX = Math.max(boundingRect.tr[0], cdn[0]);
    const newTRY = Math.max(boundingRect.tr[1], cdn[1]);
    const newTLY = Math.max(boundingRect.tl[1], cdn[1]);
    const newBRX = newTRX;
    return {
      ...boundingRect,
      tr: [newTRX, newTRY],
      tl: [boundingRect.tl[0], newTLY],
      br: [newBRX, boundingRect.br[1]],
    };
  }
  if (plane === "br") {
    const newBRX = Math.max(boundingRect.br[0], cdn[0]);
    const newBRY = Math.min(boundingRect.br[1], cdn[1]);
    const newTRX = Math.max(boundingRect.tr[0], cdn[0]);
    const newBLY = newBRY;
    return {
      ...boundingRect,
      br: [newBRX, newBRY],
      tr: [newTRX, boundingRect.tr[1]],
      bl: [boundingRect.bl[0], newBLY],
    };
  }

  if (plane === "bl") {
    const newBLX = Math.min(boundingRect.bl[0], cdn[0]);
    const newBLY = Math.min(boundingRect.bl[1], cdn[1]);
    const newTLX = Math.min(boundingRect.tl[0], cdn[0]);
    const newBRY = newBLY;
    return {
      ...boundingRect,
      bl: [newBLX, newBLY],
      tl: [newTLX, boundingRect.tl[1]],
      br: [boundingRect.br[0], newBRY],
    };
  }
}
type planes = "tr" | "tl" | "br" | "bl";

function addPoint(cdn: [number, number]) {
  const isInsideOrNot = isInside(cdn);

  if (typeof isInsideOrNot === "boolean" && isInsideOrNot) {
    return true;
  } else {
    const plane = isInsideOrNot as planes;
    const newBound = computeNewBoundingRect(plane, cdn, bounds);
    bounds = newBound;

    return true;
  }
}

addPoint([0, 0]);

console.log(`
 (${bounds.tl[0]},${bounds.tl[1]}).....|.....(${bounds.tr[0]},${bounds.tr[1]})
 ...........|.........
 -----------|---------
 ...........|.........
 (${bounds.bl[0]},${bounds.bl[1]})....|.....(${bounds.br[0]},${bounds.br[1]})
`);

addPoint([9, -3]);

console.log(`
 (${bounds.tl[0]},${bounds.tl[1]}).....|.....(${bounds.tr[0]},${bounds.tr[1]})
 ...........|.........
 -----------|---------
 ...........|.........
 (${bounds.bl[0]},${bounds.bl[1]})....|.....(${bounds.br[0]},${bounds.br[1]})
`);
