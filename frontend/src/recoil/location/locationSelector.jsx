import { selector } from "recoil";
import { LatitudeAtom, LongitudeAtom } from "./locationAtom";

export const LocationSelector = selector({
  key: 'LocationSelector',
  get: ({ get }) => {
    const longitude = get(LongitudeAtom);
    const latitude = get(LatitudeAtom);

    const location = {
      longitude,
      latitude
    };

    return location;
  }
})