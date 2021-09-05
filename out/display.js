"use strict";
const text = "9790663	Kinetic analysis and X-ray structure of haloalkane dehalogenase with a modified halide-binding site.	Haloalkane dehalogenase (DhlA) catalyzes the hydrolysis of haloalkanes via an alkyl-enzyme intermediate. Trp175 forms a halogen/halide-binding site in the active-site cavity together with Trp125. To get more insight in the role of Trp175 in DhlA, we mutated residue 175 and explored the kinetics and X-ray structure of the Trp175Tyr enzyme. The mutagenesis study indicated that an aromatic residue at position 175 is important for the catalytic performance of DhlA. Pre-steady-state kinetic analysis of Trp175Tyr-DhlA showed that the observed 6-fold increase of the Km for 1,2-dibromoethane (DBE) results from reduced rates of both DBE binding and cleavage of the carbon-bromine bond. Furthermore, the enzyme isomerization preceding bromide release became 4-fold faster in the mutant enzyme. As a result, the rate of hydrolysis of the alkyl-enzyme intermediate became the main determinant of the kcat for DBE, which was 2-fold higher than the wild-type kcat. The X-ray structure of the mutant enzyme at pH 6 showed that the backbone structure of the enzyme remains intact and that the tyrosine side chain lies in the same plane as Trp175 in the wild-type enzyme. The Clalpha-stabilizing aromatic rings of Tyr175 and Trp125 are 0.7 A further apart and due to the smaller size of the mutated residue, the volume of the cavity has increased by one-fifth. X-ray structures of mutant and wild-type enzyme at pH 5 demonstrated that the Tyr175 side chain rotated away upon binding of an acetic acid molecule, leaving one of its oxygen atoms hydrogen bonded to the indole nitrogen of Trp125 only. These structural changes indicate a weakened interaction between residue 175 and the halogen atom or halide ion in the active site and help to explain the kinetic changes induced by the Trp175Tyr mutation.";
function api(text) {
    const server = "";
    const entitys = [
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
    ];
    return entitys;
}
function handler(e) {
    let text = document.getElementById("input").value;
    const entitys = api(text);
    render(entitys, text);
    console.log(entitys);
    e.preventDefault();
}
function main() {
    let btn = document.getElementById("submit");
    if (btn) {
        btn.addEventListener("click", handler);
    }
}
function render(entitys, text) {
    let template = text;
    for (let entity of entitys) {
        let span = `<span class="label">${entity.label}</span>`;
        let mark = `<mark class="entity ${entity.label}">${entity.name}${span}</mark>`;
        template = template.replace(new RegExp(entity.name, "gmi"), mark);
    }
    const root = document.getElementById("result");
    if (root) {
        root.innerHTML = template;
    }
}
main();
//# sourceMappingURL=display.js.map