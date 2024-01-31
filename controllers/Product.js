const BASE_URL = "https://api.etsy.com/v3/application";

// Custom fetchApi
const fetchApi = (url) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.ETSY_API_KEY_STRING,
      charset: "utf-8",
    },
  };

  return fetch(url, requestOptions);
};

const fetchAllProducts = async (req, res) => {
  try {
    let { offset, keywords } = req.query;
    offset = offset ? Number(offset) : 0;

    let queryString = `/listings/active?limit=10&offset=${offset}`;

    if (keywords) queryString += `&keywords=${keywords}`;

    // console.log(queryString);

    const resfromApi = await fetchApi(BASE_URL + queryString);
    const data = await resfromApi.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json("Something went wrong while fetching all Products");
  }
};

const fetchProduct = async (req, res) => {
  try {
    let { prodId } = req.params;
    prodId = parseInt(prodId);

    const resfromApi = await fetchApi(
      BASE_URL + `/listings/${prodId}&includes[]=shop&includes[]=images`
    );
    const data = await resfromApi.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong while fetching Product");
  }
};

const fetchProductReview = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    const resfromApi = await fetchApi(BASE_URL + `/listings/${id}/reviews`);
    let data = await resfromApi.json();

    // console.log(data);

    const totalRatings =
      data?.count > 0
        ? data?.results?.reduce((sum, review) => {
            return sum + Number(review?.rating);
          }, 0)
        : 0;

    const averageRating =
      totalRatings === 0 ? 0 : totalRatings / Number(data?.count);

    res.status(200).json({
      totalReviews: data?.count,
      averageRating,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchShopAndProductImage = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    const resfromApi = await fetchApi(
      BASE_URL + `/listings/${id}&includes[]=shop&includes[]=images`
    );
    const data = await resfromApi.json();

    const shopName = data?.shop?.shop_name;
    const image = data?.images?.length > 0 ? data.images[0].url_75x75 : null;

    res.status(200).json({
      shopName,
      image,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export {
  fetchAllProducts,
  fetchProduct,
  fetchShopAndProductImage,
  fetchProductReview,
};
