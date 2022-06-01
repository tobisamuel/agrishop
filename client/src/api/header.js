export const userHeader = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  if (currentUser && currentUser.accessToken) {
    return { token: `Bearer ${currentUser.accessToken}` };
  } else {
    return {};
  }
};

export const vendorHeader = () => {
  const vendor = JSON.parse(localStorage.getItem("persist:root"))?.vendor;
  const currentVendor = vendor && JSON.parse(vendor).currentVendor;
  if (currentVendor && currentVendor.accessToken) {
    return { token: `Bearer ${currentVendor.accessToken}` };
  } else {
    return {};
  }
};
