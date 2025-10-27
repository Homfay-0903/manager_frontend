import { defineStore } from 'pinia';
import router from '@/router';
import { ref } from "vue";

// 使用了setup写法
export const useMenu = defineStore('menuInfo', () => {
  const menuData = ref([]);
  
  // 函数相当于传统写法的action
  const setRouter = (arr) => {
    function compilerMenu(arr) {
      if (!arr) {
        return;
      }
      menuData.value = arr;
      arr.forEach((item) => {
        let rts = {
          name: item.name,
          path: item.path,
          meta: item.meta,
          component: item.component
        };
        if (item.children && item.children.length) {
          compilerMenu(item.children);
        }
        if (!item.children) {
          let path = loadComponent(item.component);
          rts.component = path;
          router.addRoute('menu', rts);
        }

        function loadComponent(url) {
          let Module = import.meta.glob("@/views/**/*.vue");
          return Module[`/src/views/${url}.vue`];
        }
      });
    }
    compilerMenu(arr);
  };

  const addRouter = () => {
    setRouter(menuData.value);
  };

  return {
    addRouter,
    menuData,
    setRouter
  };
}, {
  persist: true
});