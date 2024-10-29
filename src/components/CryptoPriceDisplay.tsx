import { useMemo } from "react";
import { useCryptoStore } from "../store/store";
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {
  const { result, isLoading } = useCryptoStore();
  const hasResult = useMemo(
    () =>
      result &&
      Object.keys(result).length > 0 &&
      !Object.values(result).includes(""),
    [result]
  );

  return (
    <div className="result-wrapper">
      {isLoading ? (
        <Spinner />
      ) : (
        hasResult && (
          <>
            <h2>Cotización</h2>
            <div className="result">
              <img
                src={`https://cryptocompare.com/${result.IMAGEURL}`}
                alt="Imagen crypto"
              />
              <div>
                <p>
                  El precio es de: <span>{result.PRICE}</span>
                </p>
                <p>
                  Precio más alto del día: <span>{result.HIGHDAY}</span>
                </p>
                <p>
                  Precio más bajo del día: <span>{result.LOWDAY}</span>
                </p>
                <p>
                  Variación últimas 24 horas:{" "}
                  <span>{result.CHANGEPCT24HOUR}</span>
                </p>
                <p>
                  Última actualización: <span>{result.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
