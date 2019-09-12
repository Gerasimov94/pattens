import "./styles.css";

class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn)
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(observer => observer !== fn)
  }

  broadcast(data) {
    this.observers.forEach(observer => observer(data));
  }
}
const testObserver = new Observer();
const taskObserver = new Observer();
const textarea = document.querySelector('.textArea');
const counter = document.querySelector('.counter');

testObserver.subscribe(data => {
  console.log('subscribe for module 1 fired', data)
})
testObserver.subscribe(data => {
  console.log('subscribe for module 2 fired', data)
})

testObserver.broadcast({someData: 'hello'})

const getWordsCount = text =>
  text ? text.trim().split(/\s+/).length : 0;

taskObserver.subscribe(text => getWordsCount(text));
taskObserver.subscribe(text => {
  counter.innerHTML = getWordsCount(text)
})

textarea.addEventListener('keyup', () => {
  taskObserver.broadcast(textarea.value)
})
