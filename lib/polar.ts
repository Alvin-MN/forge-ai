import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "production",
});

export const PRODUCTS = {
  MARKETING_PACK: "2d59331b-62dd-47af-8d00-856a13939a5f",
  DEVELOPER_PACK: "c5f1da9f-b328-4474-9e72-aa0358556b44",
  ULTIMATE_BUNDLE: "ed88eef6-9785-4667-9fe9-a95809540a82",
  CONTENT_PRO: "05100fad-ecdf-4ac1-bd6b-2f1da6dd9850",
  CONTENT_BIZ: "0062fcd6-6f8e-45b7-a475-225ed3134cba",
  CODE_PRO: "eceed797-2140-461b-9ba4-735b5cd1861a",
} as const;
