import { R3ClientWithoutAuth, R3Client, R3ClientFileDownload } from "../clients/R3Client";

const login_endpoint = "login";

const getGalleries = () => {
  return R3ClientWithoutAuth.get("galleries");
};

const getHome = () => {
  return R3ClientWithoutAuth.get("home");
};

const getHaorList = () => {
  return R3ClientWithoutAuth.get("haor_list");
};
const getDistrictList = () => {
  return R3ClientWithoutAuth.get("district_list");
};
const getUpazilaList = () => {
  return R3ClientWithoutAuth.get("upazila_list");
};

const getHaorDetail = (id) => {
  return R3ClientWithoutAuth.get(`haor-detail/${id}`);
};

const getPages = (slug) => {
  return R3ClientWithoutAuth.get(`pages/${slug}`);
};

const getRivers = () => {
  return R3ClientWithoutAuth.get("rivers");
};

const getDistrictDetailList = () => {
  return R3ClientWithoutAuth.get("district_detail_list");
};

const getDistrictDetail = (id) => {
  return R3ClientWithoutAuth.get(`district/${id}`);
};


export { getGalleries, getHome, getHaorList, getDistrictList, getUpazilaList, getHaorDetail, getPages, getRivers, getDistrictDetailList, getDistrictDetail };
