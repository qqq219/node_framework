
import {entityTem} from './nestjs/entity.js'
import {dtoTem} from './nestjs/dto.js'
import {controllerTem} from './nestjs/controller.js'
import {moduleTem} from './nestjs/module.js'
import {serviceTem} from './nestjs/service.js'
import { daoTem } from "./nestjs/dao";
import { reqTem } from "./nestjs/req";
import { reactServiceTem } from "./nextjs/service.js";
import { reactTypesTem } from "./nextjs/types.js";
import { reactPageTem } from "./nextjs/page.js";
import { menuSqlTem } from "./sql/menu.sql";
import { reactEditTem } from './nextjs/edit.js'

const templates = {
    'tool/template/nestjs/entity.ts.vm': entityTem,
    'tool/template/nestjs/dto.ts.vm': dtoTem,
    'tool/template/nestjs/req.ts.vm': reqTem,
    'tool/template/nestjs/controller.ts.vm': controllerTem,
    'tool/template/nestjs/dao.ts.vm': daoTem,
    'tool/template/nestjs/service.ts.vm': serviceTem,
    'tool/template/nestjs/module.ts.vm': moduleTem,
    'tool/template/nextjs/service.ts.vm': reactServiceTem,
    'tool/template/nextjs/types.ts.vm': reactTypesTem,
    'tool/template/nextjs/page.ts.vm': reactPageTem,
    'tool/template/nextjs/edit.ts.vm': reactEditTem,
    'tool/template/sql/menu.sql.ts.vm': menuSqlTem,
};

export const templateIndex = (options) => {
    const result = {};
    for (const [path, templateFunc] of Object.entries(templates)) {
        result[path] = templateFunc(options);
    }
    return result;
};
