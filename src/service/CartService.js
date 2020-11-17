export default class CartService {
    // 构造函数，初始化全局属性
    constructor() {
        this.items = [];
    }

    // 查找商品是否存在
    findById(id) {
        return this.items.find(x => x.product.id == id);
    }

    // 添加商品
    addToCart(product,num) {
        let item = this.findById(product.id);
        if (item) {
            // 已经购买过该商品
            item.quantity+=num
        } else {
            // 构建item对象
            item = {
                product:product,
                quantity: num
            }
            // 添加到购物车对象
            this.items.push(item);
        }
    }

    // 修改数量
    updateQuantity(productId, quantity) {
        let item = this.findById(productId);
        if (item) item.quantity = quantity;
    }

    //删除
    removeCart(productId) {
       console.log(productId)
        let index = this.items.findIndex(item => item.product.id === productId);
        console.log(index)
        this.items.splice(index, 1);
        console.log(this.items)
        this.saveCart();
    }

    // 保存购物车
    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    // 读取购物车
    loadCart() {
        let data = localStorage.getItem("cart");
        if (data) this.items = JSON.parse(data);
    }

    // 汇总数量
    totalQuantity() {
        let sum = 0;
        this.items.forEach(x => sum += parseInt(x.quantity));
        return sum;
    }

    // 汇总金额
    totalPrice() {
        let sum = 0;
        this.items.forEach(x => sum += parseInt(x.quantity * x.unitprice));
        return sum;
    }

    // 清除购物车
    clearCart(){
        localStorage.removeItem("cart");
        this.items=[]
    }
}