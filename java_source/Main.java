import javax.swing.*;
import java.awt.*;

public class Main {
    private static JFrame frame;
    private static WordManager wordManager;
    private static PlayerManager playerManager;

    public static void main(String[] args) {
        wordManager = new WordManager();
        playerManager = new PlayerManager();

        SwingUtilities.invokeLater(() -> {
            frame = new JFrame("Jumble Master: Java Edition");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
            // Fallback for non-fullscreen environments
            frame.setSize(1200, 800);
            frame.setLocationRelativeTo(null);
            
            showMenu();
            frame.setVisible(true);
        });
    }

    public static void showMenu() {
        frame.getContentPane().removeAll();
        frame.add(new MenuPage());
        frame.revalidate();
        frame.repaint();
    }

    public static void showAdminLogin() {
        frame.getContentPane().removeAll();
        frame.add(new AdminLoginPage());
        frame.revalidate();
        frame.repaint();
    }

    public static void showAdminDashboard() {
        frame.getContentPane().removeAll();
        frame.add(new AdminPage(wordManager));
        frame.revalidate();
        frame.repaint();
    }

    public static void showPlayerInfo() {
        frame.getContentPane().removeAll();
        frame.add(new PlayerInfoPage(playerManager));
        frame.revalidate();
        frame.repaint();
    }

    public static void showStartPage() {
        frame.getContentPane().removeAll();
        frame.add(new StartPage(playerManager));
        frame.revalidate();
        frame.repaint();
    }

    public static void showGamePage() {
        frame.getContentPane().removeAll();
        frame.add(new GamePage(wordManager, playerManager));
        frame.revalidate();
        frame.repaint();
    }

    public static void showResultPage(int score, long timeSpent) {
        frame.getContentPane().removeAll();
        frame.add(new ResultPage(playerManager, score, timeSpent));
        frame.revalidate();
        frame.repaint();
    }

    public static JFrame getFrame() {
        return frame;
    }
}
