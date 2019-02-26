export type EventType = string;

export type ListenerFn = (...arg: any[]) => void;

class EventObject {
    fn: ListenerFn;
    once: boolean;
    context?: any;

    constructor(fn: ListenerFn, once: boolean, context?: any) {
        this.fn = fn;
        this.once = once;
        this.context = context;
    }
}

export default class EventEmitter {
    private events: Map<EventType, EventObject[]>;

    constructor() {
        this.events = new Map();
    }

    private addEventListener(event: EventType, fn: ListenerFn, once: boolean, context?: any) {
        if (!(fn instanceof Function)) {
            throw new Error('fn must be a function');   
        }

        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        const listeners = this.events.get(event);
        listeners.push(new EventObject(fn, false, context));

        return this;
    }

    private removeEventListener(event: EventType, fn?: ListenerFn) {
        if (!this.events.has(event)) {
            return this;
        }

        if (!fn) {
            this.events.delete(event);
            return this;
        }

        const listeners = this.events.get(event);
        for (let i = 0; i < listeners.length;) {
            const obj = listeners[i];
            if (obj.fn === fn) {
                listeners.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    on(event:EventType, fn: ListenerFn, context?: any) {
        return this.addEventListener(event, fn, false, context);
    }

    once(event: EventType, fn: ListenerFn, context?: any) {
        return this.addEventListener(event, fn, true, context);
    }

    off(event: EventType, fn: ListenerFn) {
        return this.removeEventListener(event, fn);
    }

    removeAll(event: EventType) {
        return this.removeEventListener(event);
    }

    emit(event: EventType, ...args: any) {
        if (!this.events.has(event)) {
            return this;
        }

        const listeners = this.events.get(event);
        for (let i = 0; i < listeners.length;) {
            const obj = listeners[i];

            if (obj.context) {
                obj.fn.call(obj.context, args);
            } else {
                /**
                 * equals to:
                 * const fn = obj.fn;
                 * fn(...args);
                 */
                (obj.once, obj.fn)(...args);
            }

            if (obj.once) {
                listeners.splice(i, 1);
            } else {
                i++;
            }
        }
        return this;
    }

    eventNames() {
        return [...this.events.keys()];
    }

    listeners(event: EventType, withContext: boolean = false) {
        if (this.events.has(event)) {
            return this.events.get(event).map(obj => withContext && obj.context ? obj.fn.bind(obj.context) : obj.fn);
        }
        return [];
    }
}