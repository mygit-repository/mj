package MelodySync.service;

import MelodySync.model.LyricsResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class LyricsService {

    public LyricsResponse getLyrics() {

        return new LyricsResponse(

                Arrays.asList(
                        "Meri tumhi se hai jawabdari, naraazgi bhi dher saari",
                        "Tumhein harane ki zid mein, ye zindagi tumhee se haari",
                        "Agar kabhi tumhein rulaya, kaha mujhe bhi chain aaya",
                        "Asal men dil nahi tumhara, khud hee ka dukhaya",
                        "Kya batau dard leke, kitni raahat hui hai mujhe",
                        "Lag raha hai qayde se ab mohabbat hui hai mujhe"
                ),

                Arrays.asList(
                        6200,
                        5750,
                        5000,
                        3850,
                        10000,
                        5600
                ),

                "/audio/QaydeSe1.mp3",

                null,

                null

                /*
                To play specific part:

                85,
                115
                 */
        );
    }
}
