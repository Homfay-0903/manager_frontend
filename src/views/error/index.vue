<template>
    <div class="error-container">
        <div class="error-content">
            <div class="error-number">404</div>
            <div class="error-message">
                你无权访问该页面
            </div>
            <p class="error-description">
                你无权访问该页面，请联系管理员
            </p>
            <button class="back-home" @click="goHome">
                返回首页
            </button>
        </div>

        <!-- 装饰元素 -->
        <div class="decor decor-1"></div>
        <div class="decor decor-2"></div>
        <div class="decor decor-3"></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/home');
};
</script>

<style lang="scss" scoped>
.error-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    position: relative;
    overflow: hidden;
    padding: 20px;
}

.error-content {
    text-align: center;
    z-index: 10;
    max-width: 600px;
    width: 100%;
}

.error-number {
    font-size: clamp(8rem, 25vw, 15rem);
    font-weight: 900;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    margin: 0;
    animation: float 6s ease-in-out infinite;
}

.error-message {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: white;
    margin: 20px 0 10px;
    font-weight: 600;
}

.error-description {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 30px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.back-home {
    background-color: white;
    color: #1a2a6c;
    border: none;
    padding: 12px 30px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        background-color: #f8f9fa;
    }

    &:active {
        transform: translateY(-1px);
    }
}

// 装饰元素
.decor {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    filter: blur(30px);
    animation: move 20s infinite alternate;
}

.decor-1 {
    width: 300px;
    height: 300px;
    top: -100px;
    left: -100px;
    animation-delay: 0s;
}

.decor-2 {
    width: 400px;
    height: 400px;
    bottom: -150px;
    right: -100px;
    animation-delay: 5s;
}

.decor-3 {
    width: 200px;
    height: 200px;
    top: 50%;
    right: 10%;
    animation-delay: 10s;
}

// 动画
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0px);
    }
}

@keyframes move {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }

    100% {
        transform: translate(50px, 30px) rotate(10deg);
    }
}
</style>