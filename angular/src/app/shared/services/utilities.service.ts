import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService  {
  constructor() {}
  
  UnflatteringForTree = (arr: any[]): any[] => {
    const map = {};
    const roots: any[] = [];
    let node = {
      data: {
        id: '',
        parentId: ''
      },
      expanded: true,
      children: []
    };
    for (let i = 0; i < arr.length; i += 1) {
      map[arr[i].code] = i; // initialize the map
      arr[i].data = arr[i]; // initialize the data
      arr[i].children = []; // initialize the children
    }
    for (let i = 0; i < arr.length; i += 1) {
      node = arr[i];
      if (node.data.parentId !== null && arr[map[node.data.parentId]] != undefined) {
        arr[map[node.data.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
}
