const addButton = document.querySelector('.add');
const source =  document.querySelector('.input');
let dragSrcEl = null;

function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };
  
  function dragEnter(e) {
    this.classList.add('over');
  }
  
  function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function dropElement(dropValue,e) {
    const li = document.createElement('li');
    const attr = document.createAttribute('draggable');
    const ul = document.querySelector('ul');
    if(dragSrcEl != source && dragSrcEl != null)
    {
        ul.removeChild(dragSrcEl);
    }
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(attr);
    li.appendChild(document.createTextNode(dropValue));
    const dropElem = ul.insertBefore(li, e);
    addEventsDragAndDrop(dropElem);
  }
  
  function dragDrop(e) {
    if (dragSrcEl != this) {
        if(dragSrcEl === source) {
            const dropValue =  document.querySelector('.input').value;
            if(dropValue != '') {
                document.querySelector('.input').value = '';
                dropElement(dropValue,this);
            }
        }
        else {
            const dropValue = dragSrcEl.innerHTML;
            dropElement(dropValue,this);
            this.parentNode.removeChild(dragSrcEl);
        }
    }
    return false;
  }
  
  function dragEnd(e) {
    let listItems = document.querySelectorAll('.draggable');
    listItems.forEach(function(item) {
      item.classList.remove('over');
    });
    this.style.opacity = '1';
  }
  
  function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
  }
  
  const listItems = document.querySelectorAll('.draggable');
  listItems.forEach(function(item) {
    addEventsDragAndDrop(item);
  });
  
  function addNewItem() {
    const newItem = document.querySelector('.input').value;
    if (newItem != '') {
      document.querySelector('.input').value = '';
      const li = document.createElement('li');
      const attr = document.createAttribute('draggable');
      const ul = document.querySelector('ul');
      li.className = 'draggable';
      attr.value = 'true';
      li.setAttributeNode(attr);
      li.appendChild(document.createTextNode(newItem));
      ul.appendChild(li);
      addEventsDragAndDrop(li);
    }
  }
  source.addEventListener('dragstart', dragStart, false);
  source.addEventListener('dragend', dragEnd, false);
  addButton.addEventListener('click', addNewItem);