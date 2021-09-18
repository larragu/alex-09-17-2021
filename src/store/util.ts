import { HighestLowest, SortOption } from "../models";

const sort = (a:number,b:number, sortOption:SortOption) => {
  if(a > b) {
    return sortOption === SortOption.ASCENDING ? 1 : -1;
  }
  if(a < b){
    return sortOption === SortOption.ASCENDING ? -1 : 1;
  }
  return 0;
}

const deleteAndAdd = (
  originalOrder:any,valueToDelete:number, 
  originalArr:number[], 
  originalMap:any, 
  sortOption:SortOption): number => {
  const PRICE = 0;
  const SIZE = 1;

  const arr = originalArr.slice();
  const map = {...originalMap}
  const order = {...originalOrder};
  
  delete map[order[valueToDelete]];

  map[order[PRICE]] = order[SIZE];
  arr.pop();
  arr.push(order[PRICE])
  arr.sort((a:number,b:number) => sort(a,b, sortOption));
  return arr[arr.length-1];
}


export const transformData = (
  originalFilteredOrders:any[], 
  originalMap:any, 
  lowestHighestBidAskPrice:number, 
  originalArray:number[], 
  sortOption:SortOption ) => {
  const map = {...originalMap}
  const arr = originalArray.slice();
  const filteredOrders = originalFilteredOrders.slice();
  const PRICE = 0;
  const SIZE = 1;
  const MAX_SIZE = 16;

  filteredOrders.forEach((filt:[number, number]) => {
    //if max size has been reached
    if(Object.keys(map).length >= MAX_SIZE) {

    if(sortOption === SortOption.DESCENDING) {
      if(filt[PRICE] <= lowestHighestBidAskPrice) {
        return;
      }
    } else {
      if(filt[PRICE] >= lowestHighestBidAskPrice) {
        return;
      }
    }
    //the new price is not in the map AND
    //the new price is greater than the lowest price
    //therefore: delete lowest price, add new price, and change lowest price to the next lowest price
    if(sortOption === SortOption.DESCENDING) {
      if(!map[filt[PRICE]] && filt[PRICE] > lowestHighestBidAskPrice) {
        lowestHighestBidAskPrice = deleteAndAdd(filt,lowestHighestBidAskPrice,arr,map,sortOption);
        return;
      } 
    } else {
      if(!map[filt[PRICE]] && filt[PRICE] < lowestHighestBidAskPrice) {
        lowestHighestBidAskPrice = deleteAndAdd(filt,lowestHighestBidAskPrice,arr,map,sortOption)
        return;
      }
    }

    if(!map[filt[PRICE]]) {
      map[filt[PRICE]] = filt[SIZE];
      arr.push(filt[PRICE]);
      arr.sort((a:number,b:number) => sort(a,b, sortOption));
    } else {
      let prevSize = map[filt[PRICE]];

      if(prevSize !== filt[SIZE]) {
        map[filt[PRICE]] = filt[SIZE];
      }
    }

    //Array is less than 25
    } else {
      //New Price
      if(!map[filt[PRICE]]) {
        map[filt[PRICE]] = filt[SIZE];
        arr.push(filt[PRICE]);
        arr.sort((a:number,b:number) => sort(a,b, sortOption));
        lowestHighestBidAskPrice = arr[arr.length-1];
        //Same Price, compare Size
      } else {
        let prevSize = map[filt[PRICE]];

        if(prevSize !== filt[SIZE]) {
          map[filt[PRICE]] = filt[SIZE];
        }
      }
    }

  })

  let highLow = HighestLowest.HIGHEST
  if(sortOption === SortOption.DESCENDING) {
    highLow = HighestLowest.LOWEST
  }

  return {list:[...arr],map:{...map}, [highLow]:lowestHighestBidAskPrice};
}