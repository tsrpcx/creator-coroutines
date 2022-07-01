import { Asset, AssetManager, assetManager, director, instantiate, JsonAsset, Node, Prefab } from "cc";

export async function loadBundle(bundleName: string): Promise<AssetManager.Bundle> {
    return new Promise<AssetManager.Bundle>((resolve, reject) => {
        assetManager.loadBundle(bundleName, (err, bundle) => {
            if (bundle) {
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

    let bundle = await loadBundle(bundleName);

    if (bundle) {
        return new Promise<Asset>((resolve, reject) => {
            bundle.load(pathName, (e, p) => {
                if (p) {
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

    let prefab = await loadAsset(bundleOrPath, path) as Prefab;

    if (!prefab) {
        console.error("Cannot instantiate resource at path: '" + path + "'.");
        return null;
    }

    let node = instantiate(prefab.data);
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

    let bundle = await loadBundle(bundleName);

    if (bundle) {
        return new Promise<Asset[]>((resolve, reject) => {
            bundle.loadDir(pathName, (e, p) => {
                if (p) {
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

    let bundle = await loadBundle(bundleName);

    if (bundle) {
        return new Promise<JsonAsset[]>((resolve, reject) => {
            bundle.loadDir(pathName, JsonAsset, (e, p) => {
                if (p) {
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

    if (!String.isNullOrEmpty(bundleName)) {
        let bundle = await loadBundle(bundleName);

        if (bundle) {
            return new Promise<void>((resolve, reject) => {
                bundle.loadScene(sceneName, (e, s) => {
                    if (s) {
                        director.runScene(s, null, (e, s) => {
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
                        resolve();
                    })
                }
            });
        });
    }
}