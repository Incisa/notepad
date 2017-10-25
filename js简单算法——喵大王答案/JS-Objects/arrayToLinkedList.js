function toLinkedList(array) {
  var result = {
    next: null
  }
  array.map(value => ({
      value: value,
      next: null
    }))
    .reduce(function(linkedList, node) {
      linkedList.next = node
      return node
    }, result)
  return result
}


function arrayToLinkedList(array) {
  if (array.length == 0) {
    return {
      next: null
    }
  }

  var nodes = []

  for (var i = 0; i < array.length; i++) {
    nodes.push({
      value: array[i],
      next: null
    })
  }

  for (var i = 0; i < array.length - 1; i++) {
    nodes[i].next = nodes[i + 1]
  }

  return {
    next: nodes[0]
  }
}


function arrayToLinkedList(array) {
  var result = {
    next: null
  }

  array.map(function(item) {
    return {
      value: item,
      next: null
    }
  }).reduce(function(linkedList, currNode) {
    debugger
    linkedList.next = currNode
    return currNode
  }, result)

  return result
}
