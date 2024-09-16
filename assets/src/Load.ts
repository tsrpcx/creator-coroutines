import { Asset, AssetManager, assetManager, director, instantiate, JsonAsset, Node, Prefab } from "cc";
import { Time } from "./Time";

const DEBUG_LOG = false;

export async function loadBundle(bundleName: string): Promise<AssetManager.Bundle> {
    const b = assetManager.getBundle(bundleName);
    if (b) return b;

    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadBundle', bundleName);
    return new Promise<AssetManager.Bundle>((resolve, reject) => {
        assetManager.loadBundle(bundleName, (err, bundle) => {
            if (bundle) {
                DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadBundle loaded', bundleName);
                resolve(bundle);
            }
            else {
                console.error('loadBundle failed', bundleName);
                resolve(null);
            }
        });
    });
}

export async function loadAsset(bundleOrPath: string, path?: string): Promise<Asset> {

    let bundleName: string;
    let pathName: string;
    if (String.isNullOrEmpty(path)) {
        bundleName = 'resources';
        pathName = bundleOrPath;
    }
    else {
        bundleName = bundleOrPath;
        pathName = path;
    }
    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadAsset', bundleName, pathName);

    let bundle = await loadBundle(bundleName);

    if (bundle) {
        const a = bundle.get(pathName);
        if (a) {
            DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadAsset loaded', bundleName, pathName);
            return a;
        }

        return new Promise<Asset>((resolve, reject) => {
            bundle.load(pathName, (e, p) => {
                if (p) {
                    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadAsset loaded', bundleName, pathName);
                    resolve(p);
                }
                else {
                    console.error('loadAsset path failed ', bundleName, pathName);
                    resolve(null);
                }
            });
        });
    }
}

export async function instantiatePrefab(bundleOrPath: string, path?: string): Promise<Node> {

    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'instantiatePrefab', bundleOrPath, path);
    let prefab = await loadAsset(bundleOrPath, path) as Prefab;

    if (!prefab) {
        console.error("Cannot instantiate resource at path: '" + path + "'.");
        return null;
    }

    let node = instantiate(prefab.data);
    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'instantiatePrefab loaded', bundleOrPath, path);
    return node;
}


export async function loadResourcesAtPath(bundleOrPath: string, path?: string): Promise<Asset[]> {

    let bundleName: string;
    let pathName: string;
    if (String.isNullOrEmpty(path)) {
        bundleName = 'resources';
        pathName = bundleOrPath;
    }
    else {
        bundleName = bundleOrPath;
        pathName = path;
    }
    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadResourcesAtPath', bundleName, pathName);

    let bundle = await loadBundle(bundleName);

    if (bundle) {
        return new Promise<Asset[]>((resolve, reject) => {
            bundle.loadDir(pathName, (e, p) => {
                if (p) {
                    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadResourcesAtPath loaded', bundleName, pathName);
                    resolve(p);
                }
                else {
                    console.error('loadResourcesAtPath path failed ', bundleName, pathName);
                    resolve(null);
                }
            });
        });
    }
}

export async function loadJsonsAtPath(bundleOrPath: string, path?: string): Promise<JsonAsset[]> {

    let bundleName: string;
    let pathName: string;
    if (String.isNullOrEmpty(path)) {
        bundleName = 'resources';
        pathName = bundleOrPath;
    }
    else {
        bundleName = bundleOrPath;
        pathName = path;
    }
    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadJsonsAtPath', bundleName, pathName);

    let bundle = await loadBundle(bundleName);

    if (bundle) {
        return new Promise<JsonAsset[]>((resolve, reject) => {
            bundle.loadDir(pathName, JsonAsset, (e, p) => {
                if (p) {
                    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadJsonsAtPath loaded', bundleName, pathName);
                    resolve(p);
                }
                else {
                    console.error('loadResourcesAtPath path failed ', bundleName, pathName);
                    resolve(null);
                }
            });
        });
    }
}

export async function loadSceneAsync(bundleOrScene: string, scene?: string): Promise<void> {

    let bundleName: string;
    let sceneName: string;
    if (String.isNullOrEmpty(scene)) {
        bundleName = null;
        sceneName = bundleOrScene;
    }
    else {
        bundleName = bundleOrScene;
        sceneName = scene;
    }
    DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadSceneAsync', bundleName, sceneName);

    if (!String.isNullOrEmpty(bundleName)) {
        let bundle = await loadBundle(bundleName);

        if (bundle) {
            return new Promise<void>((resolve, reject) => {
                bundle.loadScene(sceneName, (e, s) => {
                    if (s) {
                        director.runScene(s, null, (e, s) => {
                            DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadSceneAsync loaded', bundleName, sceneName);
                            resolve();
                        });
                    }
                    else {
                        console.error('loadSceneAsync sceneName failed ', bundleName, sceneName);
                        resolve();
                    }
                });
            });
        }
    }
    else {
        return new Promise<void>((resolve, reject) => {
            director.preloadScene(sceneName, null, (e, s) => {
                if (e) {
                    console.error('loadSceneAsync sceneName failed ', sceneName);
                    resolve()
                }
                else {
                    director.loadScene(sceneName, null, () => {
                        DEBUG_LOG && console.log(Time.realtimeSinceStartupMs, 'loadSceneAsync loaded', bundleName, sceneName);
                        resolve();
                    })
                }
            });
        });
    }
}