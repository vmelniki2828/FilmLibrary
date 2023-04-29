export function addWatched(item) {
  let items = JSON.parse(localStorage.getItem('watched')) || [];
  items.push(item);
  localStorage.setItem('watched', JSON.stringify(items));
}

export function addQueue(item) {
  let items = JSON.parse(localStorage.getItem('queue')) || [];

  if (!items.includes(item)) {
    items.push(item);
    localStorage.setItem('queue', JSON.stringify(items));
  }
}

export function removeWatched(item) {
  let items = JSON.parse(localStorage.getItem('watched')) || [];
  items = items.filter(value => {
    return value == item;
  });
  localStorage.setItem('watched', JSON.stringify(items));
}

export function removeQueue(item) {
  let items = JSON.parse(localStorage.getItem('queue')) || [];
  items = items.filter(function (value) {
    return value == item;
  });
  localStorage.setItem('queue', JSON.stringify(items));
}

export function checkWatchedValue(value) {
    let myObject = JSON.parse(localStorage.getItem('watched')) || {};
    if (myObject.hasOwnProperty(value)) {
    //   console.log(`Значение свойства: ${value}`);
    //   return false
    } else {
    //   console.log(value);
    //   return true
    }
  }

export function checkQueueValue(value) {
  let myObject = JSON.parse(localStorage.getItem('queue')) || [];
  console.log(myObject);
  console.log(myObject.includes(value));
  if (myObject.includes(value)) {
    console.log(`Значение свойства: ${value}`);
    return false
  } else {
    return true
  }
}

localStorage.clear();
