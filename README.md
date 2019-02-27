# 这是一个 TS 版的 EventEmitter 

## 简介
这是一个使用 `TypeScript` 实现的 `EventEmitter` 类。

这是一个个人学习项目，用于学习和实践 `EventEmitter` 中的代码实现。

本项目的实现会加入作者的想法和思考，所以会和标准的 `EventEmitter` 有所差距。我会在后续补全相关的文档。

## API
> 注册事件的监听函数
```
- on(event, fn, [context]): this;
```
- `event`：事件名称
- `fn`：事件监听函数
- `[context]`：监听函数的执行上下文

> 注册执行一次的实践监听函数
```
- once(event, fn, [context]): this;
```
- `event`：事件名称
- `fn`：事件监听函数
- `[context]`：监听函数的执行上下文

> 移除事件的某个监听函数
```
- off(event, fn): this;
```
- `event`：事件名称
- `fn`：事件的监听函数

> 移除事件的所有监听函数
```
- removeAll(event): this;
```
- `event`：事件名称

> 触发事件
```
- emit(event, ...args: any): this;
```
- `event`：事件名称
- `...args`：传给回调函数的参数

> 返回注册的所有实践名称
```
- eventNames(): event[];
```

> 返回注册事件的所有回调函数
```
- listeners(event, [withContext: boolean]): fn[];
```
- `event`：事件名称
- `[withContext]`：是否返回绑定上下文的回调函数（默认：false）