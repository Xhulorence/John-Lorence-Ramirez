import java.util.ArrayList;
import java.util.List;

public class WordManager {
    public static class WordEntry {
        public String word;
        public String hint;
        public WordEntry(String word, String hint) {
            this.word = word.toUpperCase();
            this.hint = hint;
        }
    }

    private List<WordEntry> words;

    public WordManager() {
        words = new ArrayList<>();
        // Default words
        words.add(new WordEntry("INTERNET", "This technology allows people to browse websites."));
        words.add(new WordEntry("JAVA", "A popular object-oriented programming language."));
        words.add(new WordEntry("SWING", "A GUI widget toolkit for Java."));
    }

    public List<WordEntry> getWords() {
        return words;
    }

    public boolean addWord(String word, String hint) {
        if (words.size() >= 15) return false;
        words.add(new WordEntry(word, hint));
        return true;
    }

    public void removeWord(int index) {
        if (index >= 0 && index < words.size()) {
            words.remove(index);
        }
    }

    public void updateWord(int index, String word, String hint) {
        if (index >= 0 && index < words.size()) {
            words.set(index, new WordEntry(word, hint));
        }
    }
}
