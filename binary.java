import java.util.*;

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail

class TestClass {
  public static void main(String args[]) throws Exception {
    Scanner input = new Scanner(System.in);
    int test = sc.nextInt();
    while (test-- > 0) {
      int n = input.nextInt();
      char[] s = input.next().toCharArray();
      TreeSet<Integer>[] set = new TreeSet[2];
      set[0] = new TreeSet<>();
      set[1] = new TreeSet<>();
      for (int i = 0; i < n; ++i) {
        set[s[i] - '0'].add(i);
      }
      int ans = 0;
      while (set[0].size() > 0 && set[1].size() > 0) {
        int min = set[0].first() < set[1].first() ? 0 : 1;
        int max = min ^ 1;
        boolean toggle = true;
        int idx = -1;
        while (true) {
          if (toggle) {
            Integer i = set[min].higher(idx);
            if (i == null)
              break;
            else {
              idx = i;
              set[min].remove(i);
            }
          } else {
            Integer i = set[max].higher(idx);
            if (i == null)
              break;
            else {
              idx = i;
              set[max].remove(i);
            }
          }
          toggle = !toggle;
        }
        ++ans;
      }
      ans += set[0].size() + set[1].size();
      System.out.println(ans);
    }

  }
}