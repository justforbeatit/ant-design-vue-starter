<script setup lang="ts">
// code...
</script>

<template>
  <header>
    <div class="item-l">
      <div>
        <p>
          <img src="@/assets/user.svg" style="height: 50px;width: 50px;"/>
        </p>
      </div>
      <div style="margin-left: 1rem;">
        <p>Hi，祝你开心每一天</p>
        <p><a-typography-text type="secondary">欢迎回来！</a-typography-text></p>
      </div>
    </div>
    <div class="item-r">
      <div class="analysis sep">
        <p><a-typography-text type="secondary">订单数</a-typography-text></p>
        <p>32932</p>
      </div>
      <div class="analysis sep">
        <p><a-typography-text type="secondary">商品数</a-typography-text></p>
        <p>32932</p>
      </div>
      <div class="analysis">
        <p><a-typography-text type="secondary">入驻商家</a-typography-text></p>
        <p>32932</p>
      </div>
    </div>
  </header>
  <main>
    <a-card title="快捷导航" style="margin: 1.2rem;" :bordered="false">
      <p>Hello1</p>
    </a-card>
    <a-card title="操作日志" style="margin: 1.2rem;" :bordered="false">
      <p>Hello2</p>
    </a-card>
    <a-card style="margin: 1.2rem;" :bordered="false">
      <p>Hello3</p>
    </a-card>
  </main>
</template>

<style scoped>
header {
  margin-top: 1rem;
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
#main {
  margin: 0.8rem;
  width: 100%;
}
.item-l {
  margin-left: 1rem;
  width: 40%;
  display: flex;
  align-items: center;
}
.item-r {
  margin-right: 1rem;
  display: flex;
}
.item-r .analysis {
  margin-right: 1rem;
  margin-left: 1rem;
  text-align: right;
  padding-top: 0.5rem;
}
.sep {
  border-right: 1px solid #f0f0f0;
  padding-right: 2rem;
}
</style>
