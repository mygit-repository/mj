package MelodySync.controller;

import MelodySync.model.LyricsResponse;
import MelodySync.service.LyricsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LyricsController {

    final private LyricsService lyricsService;

    @GetMapping("/api/lyrics")
    public LyricsResponse getLyrics() {
        return lyricsService.getLyrics();
    }
}
