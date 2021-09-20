// 后端请求接口
interface RawData {
    name: string; // entity's name. egg Chongqing, NanChang.
    label: string; // indicate which type this entity is. egg LOC, PER, ORG.
    count?: number; // how many times that identical entity occur in text.
}

//
interface Entity {
    name: string;
    label: string;
    start?: number;
    end?: number;
}

// type Entitys = Array<Entity |>

// const text =
//     "9790663	Kinetic analysis and X-ray structure of haloalkane dehalogenase with a modified halide-binding site.	Haloalkane dehalogenase (DhlA) catalyzes the hydrolysis of haloalkanes via an alkyl-enzyme intermediate. Trp175 forms a halogen/halide-binding site in the active-site cavity together with Trp125. To get more insight in the role of Trp175 in DhlA, we mutated residue 175 and explored the kinetics and X-ray structure of the Trp175Tyr enzyme. The mutagenesis study indicated that an aromatic residue at position 175 is important for the catalytic performance of DhlA. Pre-steady-state kinetic analysis of Trp175Tyr-DhlA showed that the observed 6-fold increase of the Km for 1,2-dibromoethane (DBE) results from reduced rates of both DBE binding and cleavage of the carbon-bromine bond. Furthermore, the enzyme isomerization preceding bromide release became 4-fold faster in the mutant enzyme. As a result, the rate of hydrolysis of the alkyl-enzyme intermediate became the main determinant of the kcat for DBE, which was 2-fold higher than the wild-type kcat. The X-ray structure of the mutant enzyme at pH 6 showed that the backbone structure of the enzyme remains intact and that the tyrosine side chain lies in the same plane as Trp175 in the wild-type enzyme. The Clalpha-stabilizing aromatic rings of Tyr175 and Trp125 are 0.7 A further apart and due to the smaller size of the mutated residue, the volume of the cavity has increased by one-fifth. X-ray structures of mutant and wild-type enzyme at pH 5 demonstrated that the Tyr175 side chain rotated away upon binding of an acetic acid molecule, leaving one of its oxygen atoms hydrogen bonded to the indole nitrogen of Trp125 only. These structural changes indicate a weakened interaction between residue 175 and the halogen atom or halide ion in the active site and help to explain the kinetic changes induced by the Trp175Tyr mutation.";

type Entities = Array<Entity | RawData>;
/**
 * 用于将实体按照类别分类
 * @param entities
 * @returns
 */
function entity_sort(entities: Array<Entity>): Map<string, Array<string>> {
    // 实体做一个分类 group by label()

    let label2entities: Map<string, Array<string>> = new Map();
    for (const entity of entities) {
        if (label2entities.has(entity.label)) {
            label2entities.get(entity.label)?.push(entity.name);
        } else {
            label2entities.set(entity.label, [entity.name]);
        }
    }
    return label2entities;
}

/**
 * 把实体标记成各种颜色
 * @param entitys
 * @param text
 */
function render(entitys: Entities, text: string) {
    console.log(entity_sort(entitys));
    let template = text; // 实体原文及标记

    for (let entity of entitys) {
        // list += `<li>${entity.name}:${entity.label}</li>`;
        let span = `<span class="label">${entity.label}</span>`;
        let mark = `<mark class="entity ${entity.label}">${entity.name}${span}</mark>`;
        // (?<!<mark)(?<!>)mutation
        template = template.replace(
            new RegExp(`(?<!>)${entity.name}(?!<)`, "gmi"),
            mark
        );
        // template.replaceAll(entity.name, fmt)
    }
    let list = ""; //实体列表
    for (let item of entity_sort(entitys)) {
        // item: [key, value]
        let innerUList = "";
        let listItem = "";
        for (let entityName of item[1]) {
            listItem = `<li>${entityName}</li>`;
            innerUList += listItem;
        }
        list += `<li>${item[0]}<ul>${innerUList}</ul></li>`;
    }
    console.log(list);

    // todo 这里可以创建元素， 而不是获取元素引用（解耦合）
    const root = document.getElementById("article");
    const mutationList = document.getElementById("mutations");
    if (root) {
        root.innerHTML = template;
    }
    if (mutationList) {
        mutationList.innerHTML = list;
    }
}
async function api(text: string): Promise<Entities> {
    // post client data to server, and get feedback.
    // const server = "http://10.16.24.230:8000/find";
    // let data = {
    //     title: "",
    //     abstract: "",
    //     content: text,
    // };
    // let header = new Headers({
    //     "Content-Type": "application/json",
    // });
    // const payload = JSON.stringify(data);
    // let resp = null;
    // try {
    //     resp = await fetch(server, {
    //         method: "POST",
    //         body: payload,
    //         headers: header,
    //         mode: "cors",
    //     });
    // } catch (error) {
    //     console.log(error);
    // } finally {
    //     if (resp) {
    //         const entities: Entities = await resp.json();
    //         console.log(entities);
    //         if (resp.body) {
    //             console.log(resp.body);
    //         }
    //     }
    // }
    // // 测试数据
    const entitys: Array<RawData | Entity> = [
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
}

async function handler(e: Event) {
    e.preventDefault();
    const text = (document.getElementById("input") as HTMLInputElement).value;
    //   const target = e.target as HTMLInputElement;
    //   const text = target.value;
    const entitys = await api(text);
    render(entitys, text);
}

function main() {
    let btn = document.getElementById("submit");
    if (btn) {
        btn.addEventListener("click", handler);
        // btn.addEventListener("click", ()=>{});
    }
}

main();
