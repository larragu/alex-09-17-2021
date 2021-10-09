import { BidOrAsk, Order, OrderMap, SortOption, TransformedData } from "../models";

const sort = (a:number,b:number, sortOption:SortOption) => {
  if(a > b) {
    return sortOption === SortOption.ASCENDING ? 1 : -1;
  }
  if(a < b){
    return sortOption === SortOption.ASCENDING ? -1 : 1;
  }
  return 0;
}

const getDepthArray = (list:number[], map:OrderMap) => {
  const depthArray:number[] = [];
  let totalSize = 0;
  list.forEach((price:number) => {
      totalSize = totalSize + map[price];
      depthArray.push(totalSize)
  });
  return depthArray;
}

const deleteAndAdd = (
  originalOrder:Order,
  valueToDelete:number, 
  originalArr:number[], 
  originalMap:OrderMap, 
  sortOption:SortOption): number => {
  const arr = [...originalArr];
  const map = {...originalMap}
  const order = {...originalOrder};

  delete map[valueToDelete];

  map[order.price] = order.size;

  arr.pop();
  arr.push(order.price)
  arr.sort((a:number,b:number) => sort(a,b, sortOption));

  return arr[arr.length-1];
}

export const transformData = (
  originalFilteredOrders:number[][], 
  originalMap:OrderMap, 
  lowestHighestBidAskPrice:number, 
  originalArray:number[], 
  sortOption:SortOption ): TransformedData => {  
  const PRICE = 0;
  const SIZE = 1;
  const MAX_SIZE = 16;

  const map = {...originalMap}
  const arr = originalArray.slice();
  const filteredOrders: Order[] = originalFilteredOrders.map((el:number[]) => ({price: el[PRICE], size:el[SIZE]}));;

  filteredOrders.forEach((filt:Order) => {
    //if max size has been reached
    if(Object.keys(map).length >= MAX_SIZE) {

    if(sortOption === SortOption.DESCENDING) {
      if(filt.price <= lowestHighestBidAskPrice) {
        return;
      }
    } else {
      if(filt.price >= lowestHighestBidAskPrice) {
        return;
      }
    }
    //the new price is not in the map AND
    //the new price is greater than the lowest price
    //therefore: delete lowest price, add new price, and change lowest price to the next lowest price
    if(sortOption === SortOption.DESCENDING) {
      if(!map[filt.price] && filt.price > lowestHighestBidAskPrice) {
        lowestHighestBidAskPrice = deleteAndAdd(filt,lowestHighestBidAskPrice,arr,map,sortOption);
        return;
      } 
    } else {
      if(!map[filt.price] && filt.price < lowestHighestBidAskPrice) {
        lowestHighestBidAskPrice = deleteAndAdd(filt,lowestHighestBidAskPrice,arr,map,sortOption)
        return;
      }
    }

    if(!map[filt.price]) {
      map[filt.price] = filt.size;
      arr.push(filt.price);
      arr.sort((a:number,b:number) => sort(a,b, sortOption));
    } else {
      let prevSize = map[filt.price];

      if(prevSize !== filt.size) {
        map[filt.price] = filt.size;
      }
    }

    //Array is less than 25
    } else {
      //New Price
      if(!map[filt.price]) {
        map[filt.price] = filt.size;
        arr.push(filt.price);
        arr.sort((a:number,b:number) => sort(a,b, sortOption));

        lowestHighestBidAskPrice = arr[arr.length-1];
        //Same Price, compare Size
      } else {
        let prevSize = map[filt.price];

        if(prevSize !== filt.size) {
          map[filt.price] = filt.size;
        }
      }
    }

  })

  let highLow = BidOrAsk.HIGHEST_ASK;
  let highLow2 = BidOrAsk.LOWEST_ASK
  if(sortOption === SortOption.DESCENDING) {
    highLow = BidOrAsk.LOWEST_BID;
    highLow2 = BidOrAsk.HIGHEST_BID;
  }

  const depthArray = getDepthArray(arr, map);

  return {feed:{depthArray: [...depthArray], list:[...arr],map:{...map}}, [highLow]:lowestHighestBidAskPrice, [highLow2]: arr[0]};
}