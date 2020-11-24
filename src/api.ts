export const createItemLocal = (name: string, isError?: boolean) => {
  return new Promise((resolve, reject) => {
    let item = {
      id: Math.random(),
      name,
      checked: false
    };
    setTimeout(() => {
      if (isError) reject("Error");
      else resolve(item);
    }, 500);
  });
};

export const loadItemsLocal = (isError?: boolean) => {
  return new Promise((resolve, reject) => {
    let item = ["One", "Two", "Three", "Four"];
    setTimeout(() => {
      if (isError) reject("Error");
      else resolve(item);
    }, 500);
  });
};

export const createItemApi = (name: string) => {
  return postData("/items", { name });
};

export const loadItems = () => {
  return getData(
    "https://t2wain-adventureworks-odata.azurewebsites.net/odata/customers?$filter=SalesOrderHeader/any(so:so/SalesOrderId%20gt%200)"
  ).then(
    (res) => {
      //console.log("Result:", res.value);
      return res.value.map((l: any) => l.LastName);
    },
    (err) => {
      console.log("Error:", err);
    }
  );
};

function postData(url = "", data = {}) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => response.json());
}

function getData(url = "") {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json;odata=verbose"
    }
  }).then((response) => response.json());
}
