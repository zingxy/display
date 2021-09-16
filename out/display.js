"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function entity_sort(entities) {
    var _a;
    let label2entities = new Map();
    for (const entity of entities) {
        if (label2entities.has(entity.label)) {
            (_a = label2entities.get(entity.label)) === null || _a === void 0 ? void 0 : _a.push(entity.name);
        }
        else {
            label2entities.set(entity.label, [entity.name]);
        }
    }
    return label2entities;
}
function render(entitys, text) {
    console.log(entity_sort(entitys));
    let template = text;
    for (let entity of entitys) {
        let span = `<span class="label">${entity.label}</span>`;
        let mark = `<mark class="entity ${entity.label}">${entity.name}${span}</mark>`;
        template = template.replace(new RegExp(`(?<!>)${entity.name}(?!<)`, "gmi"), mark);
    }
    let list = "";
    for (let item of entity_sort(entitys)) {
        let innerUList = "";
        let listItem = "";
        for (let entityName of item[1]) {
            listItem = `<li>${entityName}</li>`;
            innerUList += listItem;
        }
        list += `<li>${item[0]}<ul>${innerUList}</ul></li>`;
    }
    console.log(list);
    const root = document.getElementById("article");
    const mutationList = document.getElementById("mutations");
    if (root) {
        root.innerHTML = template;
    }
    if (mutationList) {
        mutationList.innerHTML = list;
    }
}
function api(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const entitys = [
            { name: "struc", label: "snp" },
            {
                name: "Trp175Tyr",
                label: "snp",
            },
            {
                name: "Kinetic",
                label: "dna",
            },
            {
                name: "structure",
                label: "protein",
            },
            {
                name: "structure",
                label: "protein",
            },
        ];
        return entitys;
    });
}
function handler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const text = document.getElementById("input").value;
        const entitys = yield api(text);
        render(entitys, text);
    });
}
function main() {
    let btn = document.getElementById("submit");
    if (btn) {
        btn.addEventListener("click", handler);
    }
}
main();
//# sourceMappingURL=display.js.map