package MelodySync.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LyricsResponse {

    private List<String> lyrics;

    private List<Integer> timings;

    private String audioUrl;

    private Integer startTime;

    private Integer endTime;
}