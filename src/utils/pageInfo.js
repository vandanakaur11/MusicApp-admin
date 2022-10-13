export const getPageDetails = async (data) => {
  return {
    hasNextPage: data?.hasNextPage,
    hasPrevPage: data?.hasPrevPage,
    page: data?.page,
    prevPage: data?.prevPage,
    nextPage: data?.nextPage,
    totalPages: data?.totalPages,
    total: data?.totalDocs,
  };
};
