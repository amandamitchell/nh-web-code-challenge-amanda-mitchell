import type { Clinician, Lab } from "../types/types";

export const getClinicians = async (): Promise<Clinician[]> => {
  return [
    {
      name: "Barb",
      address: "4120 Garfield Ave, Minneapolis, MN 55409",
      coordinates: [44.928102986049105, -93.28722825882727],
    },
    {
      name: "Isaac",
      address: "140 104th Ln NW, Blaine MN 55448",
      coordinates: [45.15977533718482, -93.27072951648834],
    },
    {
      name: "Marisol",
      address: "2393 Kalmia Ave, Boulder, CO 80304",
      coordinates: [40.039741295190304, -105.26569934554664],
    },
    {
      name: "Mary",
      address: "608 Spruce Dr, Hudson, WI 54016",
      coordinates: [44.975761243305776, -92.73292904533267],
    },
    {
      name: "Shawna",
      address: "1727 W Highland Pkwy, St Paul, MN 55116",
      coordinates: [44.92019731098985, -93.17330364535948],
    },
    {
      name: "Shelly",
      address: "1232 3rd St, Hudson, WI 54016",
      coordinates: [44.92016692301498, -93.17337874718623],
    },
    {
      name: "Tom",
      address: "14173 Flagstone Trail, Apple Valley MN 55124",
      coordinates: [44.743498977541755, -93.20477278767153],
    },
  ];
};

export const getLabs = async (): Promise<Lab[]> => {
  return [
    {
      name: "Edina Lab",
      address: "6525 France Ave, Edina, MN, 55435",
      coordinates: [44.885042207247736, -93.32721047417266],
    },
    {
      name: "Medical Arts Lab",
      address: "835 Nicollet Mall, Minneapolis, MN 55402",
      coordinates: [44.97517112450909, -93.27344924348165],
    },
    {
      name: "Bloomington Lab",
      address: "2716 E 82nd St, Bloomington, MN 55425",
      coordinates: [44.85583170870859, -93.23337700300983],
    },
    {
      name: "Hudson Lab",
      address: "400 2nd St S, Hudson, WI 54016",
      coordinates: [44.96663374294197, -92.75613022998965],
    },
    {
      name: "Boulder Lab",
      address: "4750 Nautilus Ct S, Boulder, CO 80301",
      coordinates: [40.0607450235015, -105.2044136455458],
    },
  ];
};
