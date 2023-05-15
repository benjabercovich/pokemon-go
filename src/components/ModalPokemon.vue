<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"></slot>
              <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')">
                </button>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button @click="$emit('toggle-favorite')" :class="{ 'favorite': isFavorite }">
                  {{ isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos' }}
                </button>
                <button class="start-button" @click="$emit('share')">
                  Share to my friends
                </button>
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
  width: 570px;
  height: 506px;
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