"use strict";

const retry = async (asyncFunction, options) => {
  const { retries } = options;
  let attempts = 0;

  while (attempts <= retries) {
    try {
      return await asyncFunction();
    } catch (error) {
      if (attempts === retries) {
        throw new Error("Something went wrong!");
      }
      attempts++;
    }
  }
};

const getUserInfo = async () => {
  const response = await fetch("/api/for/user");
  const userInfo = await response.json();
  return userInfo;
};

retry(getUserInfo, { retries: 3 });
