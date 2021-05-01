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