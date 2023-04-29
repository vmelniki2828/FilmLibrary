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
    return value.title !== item.title;
  });
  localStorage.setItem('watched', JSON.stringify(items));
}

export function removeQueue(item) {
  let items = JSON.parse(localStorage.getItem('queue')) || [];
  items = items.filter(value => {
    return value.title !== item.title;
  });
  localStorage.setItem('queue', JSON.stringify(items));
}

export function checkWatchedValue(value) {
  let myArray = JSON.parse(localStorage.getItem('watched')) || [];
  if (myArray.findIndex(item => item.id === value.id) === -1) {
    localStorage.setItem('watched', JSON.stringify(myArray));
    return false;
  } else {
    return true;
  }
}

export function checkQueueValue(value) {
  let myArray = JSON.parse(localStorage.getItem('queue')) || [];
  if (myArray.findIndex(item => item.id === value.id) === -1) {
    localStorage.setItem('queue', JSON.stringify(myArray));
    return false;
  } else {
    return true;
  }
}

localStorage.clear();
