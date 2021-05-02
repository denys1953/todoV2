let input = document.getElementById('input')
let button = document.getElementById('out')
let todo

if (JSON.parse(localStorage.getItem('out')) == null) {
   localStorage.setItem('out', JSON.stringify(''))
}

let out2 = JSON.parse(localStorage.getItem('out'))
document.getElementById('todo-list').innerHTML = out2
button.addEventListener('click', buttonAdd)
document.addEventListener('keydown', (e) => {
   if (e.keyCode == 13) {
      buttonAdd()
   }
})
check()

function buttonAdd() {
   todo = document.getElementById('todo-list')
   if (input.value !== '') {
      let out = ''
      out += `
         <div class="active">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <div class="checked">${input.value}</div>
            <button id="rename" type="button" class="btn btn-primary">&#9998;</button>
            <button type="button" class="btn btn-danger">&#215;</button>
         </div>
      `
      todo.innerHTML += out
      out2+=out
      input.value = ''
      input.focus()
      check()
   }
}

function check() {
   let btn = document.getElementsByClassName("btn-danger")
   let checkBox = document.getElementsByClassName("form-check-input")
   let active = document.getElementsByClassName("checked")
   let renameButton = document.getElementsByClassName('active')
   for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', clearButton)
   }
   for (let i = 0; i < checkBox.length; i++) {
      checkBox[i].addEventListener("click", checkBoxChecked)
   }
   for (let i = 0; i < active.length; i++) {
      let m = 0
      active[i].addEventListener('click', () => {
         if (m == 0) {
            active[i].parentNode.children[0].setAttribute('checked', '')
            active[i].classList.add('check')
            m++
         } else {
            active[i].parentNode.children[0].removeAttribute('checked')
            active[i].classList.remove('check')
            m--
         }
      })
   }
   for (let i = 0; i < renameButton.length; i++) {
      renameButton[i].children[2].addEventListener('click', reName)
   }
   localStorage.setItem('out', JSON.stringify(out2))
}

function clearButton() {
   this.parentElement.remove()
   out2 = document.getElementById('todo-list').innerHTML
   localStorage.removeItem('out')
   localStorage.setItem('out', JSON.stringify(out2))
}
function checkBoxChecked() {
   if (this.checked) {
      this.parentNode.children[1].classList.add('check')
      this.setAttribute('checked', '')
   } else {
      this.parentNode.children[1].classList.remove('check')
      this.removeAttribute('checked')
   }
   out2 = document.getElementById('todo-list').innerHTML
   localStorage.removeItem('out')
   localStorage.setItem('out', JSON.stringify(out2))
}
function reName() {
   if (this.parentNode.children[1].outerHTML !== '<textarea></textarea>') {
      this.innerHTML = '&#10003;'
      this.style.transform = 'rotateY(360deg)'
      let textarea = document.createElement('TEXTAREA')
      textarea.value = this.parentNode.children[1].innerHTML
      this.parentNode.children[1].remove()
      this.parentNode.insertBefore(textarea, this.parentNode.children[1])
      this.parentNode.children[1].focus()  
   } else {
      this.innerHTML = '&#9998;'
      this.style.transform = 'rotateY(180deg)'
      let div = document.createElement('div')
      div.innerHTML = this.parentNode.children[1].value
      this.parentNode.children[1].remove()
      this.parentNode.insertBefore(div, this.parentNode.children[1])
   }

}