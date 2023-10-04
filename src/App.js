import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import SoccerLineUp from "react-soccer-lineup";
import { nanoid } from "nanoid";
export default function App() {
  const [state, setState] = useState({
    color: "588f58",
    pattern: "lines",
    showHomeTeam: false,
    showAwayTeam: false,

    homeTeamColor: "f08080",
    homeTeamNumberColor: "ffffff",
    homeGoalkeeperColor: "d6cb65",
    homeGoalkeeperNumberColor: "333333",

    awayTeamColor: "add8e6",
    awayTeamNumberColor: "333333",
    awayGoalkeeperColor: "4f6c75",
    awayGoalkeeperNumberColor: "ffffff",
    nameColor: "ffffff",
  });
  const [error, setError] = useState(null);
  const [homeTeam, setHomeTeam] = useState(
    localStorage.getItem("homeTeam") === null
      ? {
          squad: {
            gk: null,
            df: [],
            fw: [],
          },
          style: {
            color: `#${state.homeTeamColor}`,
            numberColor: `#${state.homeTeamNumberColor}`,
            nameColor: `#${state.nameColor}`,
          },
        }
      : JSON.parse(localStorage.getItem("homeTeam"))
  );

  const [awayTeam, setAwayTeam] = useState(
    localStorage.getItem("awayTeam") === null
      ? {
          squad: {
            gk: null,
            df: [],
            fw: [],
          },
          style: {
            color: `#${state.awayTeamColor}`,
            numberColor: `#${state.awayTeamNumberColor}`,
            nameColor: `#${state.nameColor}`,
          },
        }
      : JSON.parse(localStorage.getItem("awayTeam"))
  );
  const [number, setNumber] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [playerTeam, setPlayerTeam] = useState("homeTeam");
  const [playerPosition, setPlayerPosition] = useState("gk");

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handlePlayerTeamChange = (event) => {
    setPlayerTeam(event.target.value);
  };

  const handlePlayerPositionChange = (event) => {
    setPlayerPosition(event.target.value);
  };

  const playerRemove = (team, position, id) => {
    if (team === "homeTeam") {
      if (position === "gk") {
        setHomeTeam((homeTeam) => ({
          ...homeTeam,
          squad: { ...homeTeam.squad, gk: null },
        }));
      } else if (position === "df") {
        setHomeTeam((homeTeam) => ({
          ...homeTeam,
          squad: {
            ...homeTeam.squad,
            df: homeTeam.squad.df.filter((player) => player.id !== id),
          },
        }));
      } else {
        setHomeTeam((homeTeam) => ({
          ...homeTeam,
          squad: {
            ...homeTeam.squad,
            fw: homeTeam.squad.fw.filter((player) => player.id !== id),
          },
        }));
      }
    } else {
      if (position === "gk") {
        setAwayTeam((awayTeam) => ({
          ...awayTeam,
          squad: { ...awayTeam.squad, gk: null },
        }));
      } else if (position === "df") {
        setAwayTeam((awayTeam) => ({
          ...awayTeam,
          squad: {
            ...awayTeam.squad,
            df: awayTeam.squad.df.filter((player) => player.id !== id),
          },
        }));
      } else {
        setAwayTeam((awayTeam) => ({
          ...awayTeam,
          squad: {
            ...awayTeam.squad,
            fw: awayTeam.squad.fw.filter((player) => player.id !== id),
          },
        }));
      }
    }
  };

  const addPlayer = () => {
    setError(null);
    if (playerName === "") {
      setError("Emni i igracit!");
    } else {
      let playerObj = {
        id: nanoid(),
        number: number,
        name: playerName,
        color:
          playerTeam === "homeTeam"
            ? `#${state.homeTeamColor}`
            : `#${state.awayTeamColor}`,
        numberColor:
          playerTeam === "homeTeam"
            ? `#${state.homeTeamNumberColor}`
            : `#${state.awayTeamNumberColor}`,
        namecolor: `#${state.nameColor}`,
      };
      if (playerTeam === "homeTeam") {
        if (playerPosition === "gk") {
          if (homeTeam.squad.gk !== null) {
            setError("Home Team goal keeper is full!");
          } else {
            playerObj.onClick = () =>
              playerRemove("homeTeam", "gk", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: { ...homeTeam.squad, gk: playerObj },
            }));
          }
        } else if (playerPosition === "df") {
          if (homeTeam.squad.df.length === 3) {
            setError("Home Team defence is full!");
          } else {
            playerObj.onClick = () =>
              playerRemove("homeTeam", "df", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: {
                ...homeTeam.squad,
                df: [...homeTeam.squad.df, playerObj],
              },
            }));
          }
        } else {
          if (homeTeam.squad.fw.length === 2) {
            setError("Home Team forward is full!");
          } else {
            playerObj.onClick = () =>
              playerRemove("homeTeam", "fw", playerObj.id);
            setHomeTeam((homeTeam) => ({
              ...homeTeam,
              squad: {
                ...homeTeam.squad,
                fw: [...homeTeam.squad.fw, playerObj],
              },
            }));
          }
        }
      } else {
        if (playerPosition === "gk") {
          if (awayTeam.squad.gk !== null) {
            setError("Home Team goal keeper is full!");
          } else {
            playerObj.onClick = () =>
              playerRemove("awayTeam", "gk", playerObj.id);
            setAwayTeam((awayTeam) => ({
              ...awayTeam,
              squad: { ...awayTeam.squad, gk: playerObj },
            }));
          }
        } else if (playerPosition === "df") {
          if (awayTeam.squad.df.length === 3) {
            setError("Away Team defence is full!");
          } else {
            playerObj.onClick = () =>
              playerRemove("awayTeam", "df", playerObj.id);
            setAwayTeam((awayTeam) => ({
              ...awayTeam,
              squad: {
                ...awayTeam.squad,
                df: [...awayTeam.squad.df, playerObj],
              },
            }));
          }
        } else {
          if (awayTeam.squad.fw.length === 2) {
            setError("Away Team forward is full!");
          } else {
            playerObj.onClick = () =>
              playerRemove("awayTeam", "fw", playerObj.id);
            setAwayTeam((awayTeam) => ({
              ...awayTeam,
              squad: {
                ...awayTeam.squad,
                fw: [...awayTeam.squad.fw, playerObj],
              },
            }));
          }
        }
      }
    }
    setNumber(number + 1);
  };

  useEffect(() => {
    localStorage.setItem("homeTeam", JSON.stringify(homeTeam));
    localStorage.setItem("awayTeam", JSON.stringify(awayTeam));
  }, [homeTeam, awayTeam]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-2"
          style={{
            backgroundColor: "green",
          }}
        >
          <form style={{ color: "white" }}>
            <div
              className="form-row"
              style={{
                width: "100%",
              }}
            >
              <div className="form-group col-12">
                {error !== null ? (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ marginTop: "32px" }}
                  >
                    {error}
                  </div>
                ) : null}
                <label htmlFor="playerName">Igraci</label>
                <input
                  type="text"
                  className="form-control"
                  id="playerName"
                  placeholder="Emri i igracit"
                  value={playerName}
                  onChange={handlePlayerNameChange}
                />
              </div>
              <fieldset className="form-group">
                <div className="row">
                  <legend className="col-form-label col-12 pt-10">
                    <b>Ekipa</b>
                  </legend>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="homeTeam"
                        checked={playerTeam === "homeTeam"}
                        onChange={handlePlayerTeamChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Ekipa Besirit
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="awayTeam"
                        checked={playerTeam === "awayTeam"}
                        onChange={handlePlayerTeamChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios2">
                        Ekipa Orhanit
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="form-group">
                <div className="row">
                  <legend className="col-form-label col-12 pt-10">
                    <b>Pozita</b>
                  </legend>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="gk"
                        checked={playerPosition === "gk"}
                        onChange={handlePlayerPositionChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Golman
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="df"
                        checked={playerPosition === "df"}
                        onChange={handlePlayerPositionChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Mbrojtes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="fw"
                        checked={playerPosition === "fw"}
                        onChange={handlePlayerPositionChange}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Shpic
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
          <button className="btn btn-primary" onClick={addPlayer}>
            Shto Igrac
          </button>
          <ul>
            <li>{homeTeam.squad.gk === null ? "" : homeTeam.squad.gk.name}</li>
            {homeTeam.squad.df.map((player) => {
              return <li>{player.name}</li>;
            })}
            {homeTeam.squad.fw.map((player) => {
              return <li>{player.name}</li>;
            })}
          </ul>
          <hr />
          <ul>
            <li>{awayTeam.squad.gk === null ? "" : awayTeam.squad.gk.name}</li>
            {awayTeam.squad.df.map((player) => {
              return <li>{player.name}</li>;
            })}
            {awayTeam.squad.fw.map((player) => {
              return <li>{player.name}</li>;
            })}
          </ul>
        </div>
        <div
          className="col-10"
          style={{
            backgroundColor: "green",
          }}
        >
          <SoccerLineUp
            size={"responsive"}
            color={"green"}
            pattern={"squares"}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />
        </div>
      </div>
    </div>
  );
}
