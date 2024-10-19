<template>  
    <div>  
      </div>  
      <h1>评论页面</h1> 
      
      <div class="comments-container">  
    <!-- 精选评论 -->  
    <div class="featured-comments" v-if="featuredComments.length > 0">  
      <h3>精选评论</h3>  
      <div class="comment" v-for="(comment, index) in featuredComments" :key="index">  
        <p>{{ comment.text }}</p>  
        <span class="rating">  
            <!-- 假设评分是1到5的整数 -->  
            <span v-for="star in Array(comment.rating).fill(true)" class="star">★</span>  
            <span v-for="blank in 5 - comment.rating" class="blank-star">☆</span>  
          </span> 
      </div>  
    </div> 
      <!-- 评论列表 -->  
        <div class="regular-comments" v-if="regularComments.length > 0">  
      <h3>更多评论</h3>  
      <div class="comment1" v-for="(comment, index) in regularComments" :key="index">  
        <p>{{ comment.text }}</p> 
        <span class="rating">  
            <!-- 假设评分是1到5的整数 -->  
            <span v-for="star in Array(comment.rating).fill(true)" class="star">★</span>  
            <span v-for="blank in 5 - comment.rating" class="blank-star">☆</span>  
          </span> 
      </div>  
    </div>  
   
      <!-- 假设这里有一个“返回”按钮或其他导航元素 -->  
      <button @click="$router.push('/')">返回</button>  
    </div>  

   
  </template>  
    
  <script>  
  export default {  
    data() {  
      return {  
        featuredComments: [  
        { text: '飞翔的鱼：外观设计很时尚，功能也很齐全，虽然有点小贵，但物有所值。', rating: 4 },  
        
        { text: '悠闲的小鹿：非常满意这次购物，产品质量很好，服务也很到位，下次还会再来。', rating: 5 }, 
        // ... 其他精选评论  
      ],
      regularComments: [  
          // 这里应该是从服务器获取的数据，直接写在数组里  
          { text: '用户1：这是一个很好的产品！', rating: 4 },  
          { text: 'AAA专业脑袋抽水：质量不错，但价格稍高。', rating: 3 } ,
          { text: '风雨小寒：质量还可以，但还算是一个挺好的产品。', rating: 4 }  ,
          { text: '傲世狂龙：第二次购买，很好用的产品，会介绍朋友一起来买。', rating: 5 } , 
          { text: '爱笑女孩：包装严实，收到后没有损坏，使用体验很好，给满分！', rating: 5 },  
          { text: '喵星人：第一次尝试这个产品，没想到效果这么好，值得推荐！', rating: 4 }, 
        ]  
      };  
    },  
    // 在这里，你可以添加方法来处理评论的加载（如果它们不是静态的）  
    // ...  
  };  
  </script>  
    
    <style scoped> 
.comment:not(:last-child)::after {  
  content: ''; /* 伪元素的内容为空 */  
  display: block; /* 伪元素是一个块级元素 */  
  height: 1px; /* 间隔线的高度 */  
  background-color: red; /* 间隔线的颜色 */  
  margin-top: 10px; /* 间隔线与评论内容之间的空间（可选） */  
} 
.comment1:not(:last-child)::after {  
  content: ''; /* 伪元素的内容为空 */  
  display: block; /* 伪元素是一个块级元素 */  
  height: 1px; /* 间隔线的高度 */  
  background-color: blue; /* 间隔线的颜色 */  
  margin-top: 10px; /* 间隔线与评论内容之间的空间（可选） */  
} 


.comment p {  
  font-weight: bold;  
  font-size: 18px;  
  color: goldenrod;  
}  
  

    .comment-list {  
      margin-top: 20px;  
      padding: 0 20px;  
      list-style: none; /* 虽然这里使用的是div而非列表，但保持整洁 */  
    }  
      
    .comment-item {  
      border-bottom: 1px solid #eee;  
      padding: 10px 0;  
      margin-bottom: 10px;  
    }  
      
    .comment-item p {  
      font-size: 16px;  
      color: #333;  
      margin: 0;  
    }  
      
    .rating {  
      display: inline-block;  
      margin-top: 5px;  
    }  
      
    .star, .blank-star {  
      display: inline-block;  
      font-size: 20px;  
      color: #ffd700; /* 金色星星 */  
      margin-right: 2px;  
    }  
      
    .blank-star {  
      color: #ccc; /* 灰色空星星 */  
    }  
      
    /* 响应式布局优化 */  
    @media (max-width: 768px) {  
      .comment-item p {  
        font-size: 14px;  
      }  
      
      .star, .blank-star {  
        font-size: 18px;  
      }  
    }  
      
    /* 按钮样式 */  
    button {  
      display: inline-block;  
      background-color: #007bff;  
      color: white;  
      padding: 10px 20px;  
      margin-top: 20px;  
      border: none;  
      border-radius: 5px;  
      cursor: pointer;  
      font-size: 16px;  
      text-decoration: none;  
    }  
      
    button:hover {  
      background-color: #0056b3;  
    }  
   
    .comment {  
  /* 评论的样式（如果需要的话） */  
  margin-bottom: 10px; /* 可以在这里添加一些底部外边距，但这不是间隔线 */  
  /* 其他样式 */  
}  

    </style>
