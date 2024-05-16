import {
  tasaIva,
  LineaTicket,
  TicketFinal,
} from "./modelo";

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const resultado = lineasTicket.reduce<TicketFinal>((final, item) => {
    const { nombre, precio, tipoIva } = item.producto;
    const cantidad = item.cantidad;
    const precioSinIva = precio;
    const iva = precio * tasaIva[tipoIva] / 100;
    const precioConIva = precio + iva;

    final.lineas.push({
      nombre,
      cantidad,
      precioSinIva,
      tipoIva,
      precioConIva: parseFloat((precioConIva * cantidad).toFixed(2))
    });

    final.total.totalSinIva = precioSinIva * cantidad;
    final.total.totalConIva = precioConIva * cantidad;
    final.total.totalIva = iva * cantidad;

    const ivaIndex = final.desgloseIva.findIndex(d => d.tipoIva === tipoIva);
    if (ivaIndex !== -1) {
      final.desgloseIva[ivaIndex].cuantia += iva * cantidad;
    } else {
      final.desgloseIva.push({ tipoIva, cuantia: iva * cantidad });
    }

    return final;
  }, {
    lineas: [],
    total: { totalSinIva: 0, totalConIva: 0, totalIva: 0 },
    desgloseIva: []
  });

  // Redondeamos el iva a 2
  resultado.desgloseIva.forEach(iva => iva.cuantia = parseFloat(iva.cuantia.toFixed(2)));

  return resultado;
};

