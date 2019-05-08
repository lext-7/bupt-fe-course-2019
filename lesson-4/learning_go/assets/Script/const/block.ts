export enum BLOCK_TYPE {
    PLATFORM = 0, // 平台
    OBSTACLE = 1, // 障碍
    MONSTER = 3, // 怪兽
}

export type BlockInfo = {
    name: string,
    type: BLOCK_TYPE,
    hurt: number,
}