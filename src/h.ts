import { isStr, arrayfy } from './reconcile';
import { FC, FreElement } from './type';

// for jsx2
// 创建vnode
export const h = (type, props: any, ...kids) => {
    props = props || {};

    // arrayfy 转义成 arr参数
    kids = flat(arrayfy(props.children || kids));

    // 如果数组只是一个直接给  props.children 如果是大于 1 那就给数组  props.children
    if (kids.length) props.children = kids.length === 1 ? kids[0] : kids;

    // 判断是否有 key 和 ref
    const key = props.key || null;
    const ref = props.ref || null;

    // 判断是否有 key 和 ref， 如果他们存在则给 undefined
    if (key) props.key = undefined;
    if (ref) props.ref = undefined;

    // 创建虚拟dom
    return createVnode(type, props, key, ref);
};

// s 不等于 null 不是布尔值情况下
const some = (x: unknown) => x != null && x !== true && x !== false;

// 把一个多维数组点平化 当然如果是数组 则只会保留最后一层
const flat = (arr: any[], target = []) => {
    arr.forEach((v) => {
        isArr(v)
            ? flat(v, target)
            : some(v) &&
              target.push(
                  // 如果是 数字或者 字符串 返回真
                  isStr(v) ? createText(v) : v // 返回v
              );
    });
    // 返回点平化 数组对象
    return target;
};

// 返回一个虚拟dom
export const createVnode = (type, props, key, ref) => ({
    type,
    props,
    key,
    ref,
});

// 创建文本节点
export const createText = (vnode: any) =>
    ({ type: '#text', props: { nodeValue: vnode + '' } } as FreElement);

// 返回属性中的自觉点
export function Fragment(props) {
    return props.children;
}

export function memo<T extends object>(
    fn: FC<T>,
    compare?: FC<T>['shouldUpdate']
) {
    fn.memo = true;
    fn.shouldUpdate = compare;
    return fn;
}

// 是否是数组
export const isArr = Array.isArray;
