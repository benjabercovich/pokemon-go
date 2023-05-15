<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"></slot>
              <button type="button" class="close" @click="$emit('close')">
                <i class="bi bi-x-circle-fill"></i></button>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="footer-buttons">
                  <button class="start-button" @click="$emit('share')">
                    Share to my friends
                  </button>
                  <button @click.stop="$emit('toggle-favorite')" :class="['rounded-circle favorite-button', { 'favorite': isFavorite }]">
                    <i class='bi-star-fill'></i>
                  </button>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: "ModalPokemon",
    props: ['isFavorite'],
  };
  </script>
  
  <style scoped>

.favorite-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  color:#FFFFFF;
  background-color:transparent;
  border:none;
}

.favorite-button i {
  font-size: 24px;
  color: #BFBFBF;
}


.modal-header {
  background: url('../assets/fondo.png') no-repeat center center;
  background-size: cover;
  max-width: 570px;
  height: 200px;
  margin-left: -30px;
  margin-right: -30px;
  margin-top: -20px;
}

.favorite-button.favorite i {
  color: #ECA539;
}

.modal-body{
  text-align: left;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  max-width: 570px;
  max-height: 506px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.start-button:hover{
        background: #C00E20;
    }

.footer-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.start-button{
        padding: 11px 23px;
        position: relative;
        border: none;
        max-width:100%;  
        height: auto; 
        background: #F22539;
        border-radius: 60px;
        font-style: normal;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 15px;
        line-height: 22px;}
</style>