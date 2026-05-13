import javax.swing.*;
import java.awt.*;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class GamePage extends JPanel {
    private WordManager wordManager;
    private PlayerManager playerManager;
    private int score = 0;
    private int timeLeft = 30;
    private Timer timer;
    private List<WordManager.WordEntry> gameWords;
    private int currentIndex = 0;

    private JLabel jumbledLabel, hintLabel, timerLabel, scoreLabel;
    private JTextField answerField;
    private long startTime;

    public GamePage(WordManager wordManager, PlayerManager playerManager) {
        this.wordManager = wordManager;
        this.playerManager = playerManager;
        this.gameWords = new ArrayList<>(wordManager.getWords());
        Collections.shuffle(this.gameWords);
        this.startTime = System.currentTimeMillis();

        setLayout(new BorderLayout(30, 30));
        setBackground(new Color(20, 20, 22));
        setBorder(BorderFactory.createEmptyBorder(50, 50, 50, 50));

        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.setOpaque(false);
        scoreLabel = new JLabel("Score: 0 / 15");
        scoreLabel.setFont(new Font("Arial", Font.BOLD, 24));
        scoreLabel.setForeground(Color.WHITE);
        timerLabel = new JLabel("Time Left: 30s");
        timerLabel.setFont(new Font("Arial", Font.BOLD, 24));
        timerLabel.setForeground(Color.CYAN);
        topPanel.add(scoreLabel, BorderLayout.WEST);
        topPanel.add(timerLabel, BorderLayout.EAST);
        add(topPanel, BorderLayout.NORTH);

        JPanel centerPanel = new JPanel(new GridBagLayout());
        centerPanel.setOpaque(false);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx = 0; gbc.insets = new Insets(10, 0, 10, 0);

        jumbledLabel = new JLabel("JUMBLED");
        jumbledLabel.setFont(new Font("Arial", Font.BOLD, 64));
        jumbledLabel.setForeground(Color.WHITE);
        gbc.gridy = 0;
        centerPanel.add(jumbledLabel, gbc);

        hintLabel = new JLabel("Hint goes here");
        hintLabel.setForeground(Color.LIGHT_GRAY);
        gbc.gridy = 1;
        centerPanel.add(hintLabel, gbc);

        answerField = new JTextField(20);
        answerField.setFont(new Font("Arial", Font.BOLD, 32));
        gbc.gridy = 2;
        centerPanel.add(answerField, gbc);

        JButton submitBtn = new JButton("SUBMIT");
        submitBtn.setBackground(new Color(37, 99, 235));
        submitBtn.setForeground(Color.WHITE);
        gbc.gridy = 3;
        centerPanel.add(submitBtn, gbc);
        add(centerPanel, BorderLayout.CENTER);

        submitBtn.addActionListener(e -> checkAnswer());

        JButton backBtn = new JButton("BACK");
        add(backBtn, BorderLayout.SOUTH);
        backBtn.addActionListener(e -> {
            int n = JOptionPane.showConfirmDialog(this, "Are you sure you want to leave?", "Confirm", JOptionPane.YES_NO_OPTION);
            if (n == JOptionPane.YES_OPTION) {
                timer.stop();
                Main.showMenu();
            }
        });

        loadWord();
        startTimer();
    }

    private void startTimer() {
        timer = new Timer(1000, e -> {
            timeLeft--;
            timerLabel.setText("Time Left: " + timeLeft + "s");
            if (timeLeft <= 0) {
                timer.stop();
                JOptionPane.showMessageDialog(this, "Time's Up!");
                loadNext();
            }
        });
        timer.start();
    }

    private void loadWord() {
        if (currentIndex < gameWords.size() && score < 15) {
            WordManager.WordEntry w = gameWords.get(currentIndex);
            jumbledLabel.setText(jumble(w.word));
            hintLabel.setText(w.hint);
            answerField.setText("");
            timeLeft = 30;
            if (timer != null) timer.restart();
        } else {
            finishGame();
        }
    }

    private void checkAnswer() {
        if (answerField.getText().equalsIgnoreCase(gameWords.get(currentIndex).word)) {
            JOptionPane.showMessageDialog(this, "Correct Answer!");
            score++;
            scoreLabel.setText("Score: " + score + " / 15");
            loadNext();
        } else {
            JOptionPane.showMessageDialog(this, "Wrong Answer!");
        }
    }

    private void loadNext() {
        currentIndex++;
        loadWord();
    }

    private void finishGame() {
        timer.stop();
        long duration = (System.currentTimeMillis() - startTime) / 1000;
        Main.showResultPage(score, duration);
    }

    private String jumble(String s) {
        List<Character> list = new ArrayList<>();
        for (char c : s.toCharArray()) list.add(c);
        Collections.shuffle(list);
        StringBuilder sb = new StringBuilder();
        for (char c : list) sb.append(c);
        return sb.toString();
    }
}
