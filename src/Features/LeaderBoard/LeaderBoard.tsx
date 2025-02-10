import styles from "./LeaderBoard.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Slices/GameStore";
import { startGame } from "../../Slices/GameSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  addUpdatePlayer,
  fetchLeaderboard,
  Player,
} from "../../Requests/leaderboard-requests";
import Form from "../../Components/Form";
import TextInput from "../../Components/TextInput";

const Leaderboard: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 300000,
  });

  const queryClient = useQueryClient();
  const { gameActive, score, playerName } = useSelector(
    (state: RootState) => state.game
  );
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: addUpdatePlayer,
    onSuccess: async () => {
      queryClient.refetchQueries({ queryKey: ["leaderboard"] });
    },
  });

  useEffect(() => {
    const updatePlayer = async () => {
      console.log(playerName);
      if (!gameActive && playerName) {
        await mutation.mutateAsync({ name: playerName, score });
      }
    };

    updatePlayer();
  }, [gameActive, playerName]);

  return (
    !gameActive && (
      <div className={styles.leaderboard}>
        <div className={styles.leaderboard__overlay}></div>
        <div className={styles.leaderboard__content}>
          <Form<Player>
            defaultValues={{ name: playerName }}
            onSubmit={(data) => {
              dispatch(startGame(data.name));
            }}
          >
            <TextInput label="You will play ass:" required name="name" />
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ?.slice()
                  .sort((a: Player, b: Player) => b.score - a.score)
                  .map((player: Player, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className={styles.leaderboard__content__button}
              type="submit"
            >
              Start Game
            </button>
          </Form>
        </div>
      </div>
    )
  );
};

export default Leaderboard;
