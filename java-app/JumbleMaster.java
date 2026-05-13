import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;
import java.util.List;
import javax.swing.Timer;

/**
 * JUMBLE MASTER - JAVA EDITION
 * All features translated from the original React version.
 */
public class JumbleMaster extends JFrame {
    
    // Core Colors based on React theme
    private static final Color BG_DARK = new Color(2, 6, 23);
    private static final Color CARD_BG = new Color(15, 23, 42);
    private static final Color TEXT_PRIMARY = Color.WHITE;
    private static final Color ACCENT_BLUE = new Color(99, 102, 241);
    private static final Color TEXT_SECONDARY = new Color(148, 163, 184);

    private CardLayout cardLayout;
    private JPanel mainContainer;
    
    // Game State
    private String playerName = "";
    private int score = 0;
    private int currentWordIndex = 0;
    private int totalTimeSeconds = 0;
    private List<WordEntry> words;

    public JumbleMaster() {
        setTitle("JUMBLE MASTER - COMMAND HUB");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1000, 700);
        setLocationRelativeTo(null);
        setBackground(BG_DARK);

        initializeWords();
        
        cardLayout = new CardLayout();
        mainContainer = new JPanel(cardLayout);
        mainContainer.setBackground(BG_DARK);

        // Add Pages
        mainContainer.add(new MainMenuPage(), "MENU");
        mainContainer.add(new PlayerRegistrationPage(), "PLAYER_INFO");
        
        add(mainContainer);
        cardLayout.show(mainContainer, "MENU");
    }

    private void initializeWords() {
        words = new ArrayList<>();
        words.add(new WordEntry("INTERNET", "This technology allows people to browse websites and communicate online."));
        words.add(new WordEntry("COMPUTER", "An electronic device for storing and processing data."));
        words.add(new WordEntry("SOFTWARE", "Programs and other operating information used by a computer."));
        words.add(new WordEntry("ALGORITHM", "A process or set of rules to be followed in calculations."));
        words.add(new WordEntry("DATABASE", "A structured set of data held in a computer."));
        words.add(new WordEntry("NETWORK", "A group or system of interconnected people or things."));
        words.add(new WordEntry("SECURITY", "The state of being free from danger or threat."));
        words.add(new WordEntry("HARDWARE", "The physical parts of a computer system."));
        words.add(new WordEntry("KEYBOARD", "A panel of keys that operates a computer or typewriter."));
        words.add(new WordEntry("BROWSER", "A program with a graphical user interface for displaying HTML files."));
        words.add(new WordEntry("WIRELESS", "Using radio, microwaves, etc. (as opposed to wires) to transmit signals."));
        words.add(new WordEntry("INTERFACE", "A point where two systems, subjects, organizations, etc., meet and interact."));
        words.add(new WordEntry("PROTOCOL", "The official procedure or system of rules governing affairs of state or diplomatic occasions."));
        words.add(new WordEntry("FIREWALL", "A part of a computer system or network that is designed to block unauthorized access."));
        words.add(new WordEntry("CLOUDS", "A network of remote servers hosted on the Internet to store, manage, and process data."));
    }

    // --- PAGE CLASSES ---

    class MainMenuPage extends JPanel {
        public MainMenuPage() {
            setLayout(new GridBagLayout());
            setBackground(BG_DARK);
            
            JLabel title = new JLabel("JUMBLE MASTER");
            title.setFont(new Font("SansSerif", Font.BOLD, 64));
            title.setForeground(TEXT_PRIMARY);
            
            JButton startBtn = createStyledButton("START MISSION", true);
            startBtn.addActionListener(e -> cardLayout.show(mainContainer, "PLAYER_INFO"));

            GridBagConstraints gbc = new GridBagConstraints();
            gbc.gridx = 0; gbc.gridy = 0; gbc.insets = new Insets(0, 0, 40, 0);
            add(title, gbc);
            
            gbc.gridy = 1;
            add(startBtn, gbc);
        }
    }

    class PlayerRegistrationPage extends JPanel {
        private JTextField nameField;

        public PlayerRegistrationPage() {
            setLayout(new GridBagLayout());
            setBackground(BG_DARK);
            
            JPanel card = new JPanel();
            card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));
            card.setBackground(CARD_BG);
            card.setBorder(BorderFactory.createEmptyBorder(40, 40, 40, 40));

            JLabel label = new JLabel("SYSTEM REGISTRAR");
            label.setForeground(ACCENT_BLUE);
            label.setAlignmentX(Component.CENTER_ALIGNMENT);
            
            nameField = new JTextField(15);
            nameField.setMaximumSize(new Dimension(300, 50));
            nameField.setFont(new Font("SansSerif", Font.PLAIN, 18));
            nameField.setBackground(BG_DARK);
            nameField.setForeground(Color.WHITE);
            nameField.setCaretColor(Color.WHITE);
            nameField.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(51, 65, 85)),
                BorderFactory.createEmptyBorder(10, 10, 10, 10)
            ));

            JButton begin = createStyledButton("INITIALIZE GAME", true);
            begin.addActionListener(e -> {
                playerName = nameField.getText();
                if (playerName.isEmpty()) playerName = "OPERATOR";
                startGame();
            });

            card.add(label);
            card.add(Box.createVerticalStrut(20));
            card.add(nameField);
            card.add(Box.createVerticalStrut(30));
            card.add(begin);

            add(card);
        }
    }

    class GamePage extends JPanel {
        private JLabel jumbledLabel;
        private JLabel hintLabel;
        private JLabel timerLabel;
        private JLabel progressLabel;
        private JTextField inputField;
        private JLabel feedbackLabel;
        private int timeLeft = 30;
        private Timer gameTimer;
        private String currentCorrectWord;

        public GamePage() {
            setLayout(new BorderLayout());
            setBackground(BG_DARK);

            // Left Sidebar Info
            JPanel sidebar = new JPanel();
            sidebar.setLayout(new BoxLayout(sidebar, BoxLayout.Y_AXIS));
            sidebar.setBackground(CARD_BG);
            sidebar.setPreferredSize(new Dimension(250, 0));
            sidebar.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

            progressLabel = new JLabel("01 / 15");
            progressLabel.setFont(new Font("SansSerif", Font.BOLD, 24));
            progressLabel.setForeground(Color.WHITE);

            sidebar.add(new JLabel("SYNC PROGRESS"));
            sidebar.add(progressLabel);

            // Main Content
            JPanel content = new JPanel(new GridBagLayout());
            content.setBackground(BG_DARK);

            jumbledLabel = new JLabel("WORD");
            jumbledLabel.setFont(new Font("SansSerif", Font.BOLD, 72));
            jumbledLabel.setForeground(TEXT_PRIMARY);

            hintLabel = new JLabel("Hint goes here...");
            hintLabel.setFont(new Font("SansSerif", Font.ITALIC, 16));
            hintLabel.setForeground(TEXT_SECONDARY);

            inputField = new JTextField(20);
            inputField.setFont(new Font("SansSerif", Font.BOLD, 24));
            inputField.setHorizontalAlignment(JTextField.CENTER);
            inputField.setBackground(CARD_BG);
            inputField.setForeground(Color.WHITE);
            inputField.setBorder(BorderFactory.createLineBorder(ACCENT_BLUE));

            feedbackLabel = new JLabel(" ");
            feedbackLabel.setFont(new Font("SansSerif", Font.BOLD, 14));

            JButton submitBtn = createStyledButton("SUBMIT", true);
            submitBtn.addActionListener(e -> handleSubmission());

            JButton skipBtn = createStyledButton("I'M STUCK (SKIP)", false);
            skipBtn.addActionListener(e -> nextWord(false));

            GridBagConstraints gbc = new GridBagConstraints();
            gbc.gridx = 0; gbc.insets = new Insets(10, 10, 10, 10);
            
            gbc.gridy = 0; content.add(jumbledLabel, gbc);
            gbc.gridy = 1; content.add(hintLabel, gbc);
            gbc.gridy = 2; content.add(inputField, gbc);
            gbc.gridy = 3; content.add(feedbackLabel, gbc);
            gbc.gridy = 4; content.add(submitBtn, gbc);
            gbc.gridy = 5; content.add(skipBtn, gbc);

            add(sidebar, BorderLayout.WEST);
            add(content, BorderLayout.CENTER);

            startTimer();
            loadWord();
        }

        private void startTimer() {
            gameTimer = new Timer(1000, e -> {
                timeLeft--;
                totalTimeSeconds++;
                if (timeLeft <= 0) {
                    nextWord(false);
                }
                repaint();
            });
            gameTimer.start();
        }

        private void loadWord() {
            if (currentWordIndex >= 15) return;
            WordEntry entry = words.get(currentWordIndex);
            currentCorrectWord = entry.word;
            jumbledLabel.setText(jumble(entry.word));
            hintLabel.setText("\"" + entry.hint + "\"");
            progressLabel.setText(String.format("%02d / 15", currentWordIndex + 1));
            inputField.setText("");
            timeLeft = 30;
            feedbackLabel.setText(" ");
        }

        private void handleSubmission() {
            if (inputField.getText().equalsIgnoreCase(currentCorrectWord)) {
                score++;
                feedbackLabel.setText("DECRYPTION SUCCESSFUL");
                feedbackLabel.setForeground(Color.GREEN);
                new Timer(500, e -> nextWord(true)).start();
            } else {
                feedbackLabel.setText("ACCESS DENIED");
                feedbackLabel.setForeground(Color.RED);
            }
        }

        private void nextWord(boolean wasCorrect) {
            currentWordIndex++;
            if (currentWordIndex >= 15) {
                gameTimer.stop();
                showResults();
            } else {
                loadWord();
            }
        }

        private String jumble(String word) {
            List<String> letters = Arrays.asList(word.split(""));
            Collections.shuffle(letters);
            StringBuilder sb = new StringBuilder();
            for (String s : letters) sb.append(s);
            if (sb.toString().equals(word)) return jumble(word);
            return sb.toString();
        }
    }

    class ResultsPage extends JPanel {
        public ResultsPage() {
            setLayout(new GridBagLayout());
            setBackground(BG_DARK);

            JLabel title = new JLabel(score >= 15 ? "MASTERMIND" : "MISSION COMPLETE");
            title.setFont(new Font("SansSerif", Font.BOLD, 72));
            title.setForeground(TEXT_PRIMARY);

            JLabel stats = new JLabel("Operator: " + playerName + " | Score: " + score + " / 15");
            stats.setForeground(ACCENT_BLUE);
            stats.setFont(new Font("SansSerif", Font.BOLD, 24));

            JLabel time = new JLabel("Duration: " + (totalTimeSeconds / 60) + "m " + (totalTimeSeconds % 60) + "s");
            time.setForeground(TEXT_SECONDARY);

            JButton restart = createStyledButton("RE-ENGAGE SYSTEM", true);
            restart.addActionListener(e -> resetGame());

            GridBagConstraints gbc = new GridBagConstraints();
            gbc.gridx = 0; gbc.insets = new Insets(5, 5, 5, 5);
            gbc.gridy = 0; add(title, gbc);
            gbc.gridy = 1; add(stats, gbc);
            gbc.gridy = 2; add(time, gbc);
            gbc.gridy = 3; gbc.insets = new Insets(40, 0, 0, 0); add(restart, gbc);
        }
    }

    // --- HELPERS ---

    private void startGame() {
        mainContainer.add(new GamePage(), "GAME");
        cardLayout.show(mainContainer, "GAME");
    }

    private void showResults() {
        mainContainer.add(new ResultsPage(), "RESULTS");
        cardLayout.show(mainContainer, "RESULTS");
    }

    private void resetGame() {
        score = 0;
        currentWordIndex = 0;
        totalTimeSeconds = 0;
        cardLayout.show(mainContainer, "MENU");
    }

    private JButton createStyledButton(String text, boolean primary) {
        JButton btn = new JButton(text);
        btn.setFont(new Font("SansSerif", Font.BOLD, 18));
        btn.setForeground(Color.WHITE);
        btn.setBackground(primary ? ACCENT_BLUE : CARD_BG);
        btn.setFocusPainted(false);
        btn.setBorder(BorderFactory.createEmptyBorder(15, 30, 15, 30));
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        return btn;
    }

    static class WordEntry {
        String word, hint;
        WordEntry(String w, String h) { word = w; hint = h; }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new JumbleMaster().setVisible(true);
        });
    }
}
