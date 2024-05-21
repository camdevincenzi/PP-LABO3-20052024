import { PlanetaBase } from "./PlanetaBase.js";

class Planeta extends PlanetaBase {
    constructor(id,nombre,tamaño,masa,tipo,distanciaAlSol,tieneVida,tieneAnillo,compAtmosferica) {
        super(id,nombre,tamaño,masa,tipo);
        this.distanciaAlSol = distanciaAlSol;
        this.tieneVida = tieneVida;
        this.tieneAnillo = tieneAnillo;
        this.compAtmosferica = compAtmosferica;
    }
}

export { Planeta }