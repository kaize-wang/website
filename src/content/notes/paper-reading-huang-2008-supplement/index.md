---
title: "Huang et al. (2008) 精读补充：证明、扩展与数值实验"
description: "Huang et al. (2008) 主精读的技术补充：逐步重构 Theorem 1，审读无限期证明，展开 emergency supply 与三类扩展，并完整整理数值实验。"
publishDate: 2026-09-04
category: Reading
tags: [inventory, warranty, paper-reading, proof, numerical-experiments]
collection: Paper Reading
aliases: ["Huang 2008 Supplement"]
lang: zh
readingStatus: Revisit
references:
  - id: huang2008
    title: "Managing the Inventory of an Item with a Replacement Warranty"
    authors: "Wei Huang, Vidyadhar Kulkarni, and Jayashankar M. Swaminathan"
    year: 2008
    venue: "Management Science 54(8): 1441–1452"
    doi: "10.1287/mnsc.1080.0863"
draft: false
featured: false
---

这份补充材料服务于主精读《Huang et al. (2008) 精读：从保修责任到基库存结构》。主文负责把整篇论文的研究问题、模型、结构定理、无限期结果、扩展和实验连成一条完整逻辑；这里则保留那些如果全部塞进主文会打断阅读、但真正做研究时又必须能够追到底的技术细节。

[返回主精读](/website/notes/paper-reading-huang-2008/)

## 一、Theorem 1：把电子附录的归纳证明逐步展开

主文中的关键基库存水平是

$$
S_n(w)=\beta\cdot w+F_n^{-1}\!\left(\frac{\bar p-c(1-\alpha)}{\bar p+h}\right),
$$

其中 $\bar p=p-(1-\alpha)m_1$。Theorem 1 假设新需求随时间随机递增，即

$$
F_n(z)\ge F_{n+1}(z),
$$

并证明 $S_n(w)$ 是全局最优订货后库存位置，而且目标函数在 $S_n(w)$ 右侧非递减。正文已经指出，完整目标函数并不保证凸，因此证明不能只靠一个普通的一阶条件。

### 最后一个决策期为什么会退化成报童问题

在 $N-1$ 期，

$$
G_{N-1,N}(w,x,y)=c(y-x)+L_{N-1}(w,y)+\alpha\mathbb E[T(\widehat w,\widehat x)].
$$

令 $q=y-\beta\cdot w$。如果 $\zeta\le q$，本期所有需求都被满足，

$$
\widehat x=q-\zeta\ge0,
\qquad
\widehat w^1=\beta\cdot w+\zeta+[x]^-.
$$

如果 $\zeta>q$，则出现积压，

$$
[\widehat x]^- =\beta\cdot w+\zeta-y,
\qquad
\widehat w^1=y+[x]^-.
$$

把两种情形分别代入

$$
T(w,x)=m\cdot w+\alpha m_1[x]^- -cx
$$

以后，会出现大量关于 $w_i$、$m_i$ 与 $\beta_i$ 的项。真正让这些项消掉的是 Proposition 1 的递推恒等式

$$
m_i=c\beta_i+\alpha\beta_i m_1+\alpha(1-\beta_i)m_{i+1}.
$$

对每一个年龄组来说，“本期失效的采购成本 + 替换品重新进入第一年龄后的未来责任 + 未失效产品继续老化后的未来责任”恰好重新组合成 $m_iw_i$。因此，所有与 $y$ 有关的部分最终只剩

$$
\phi(y)=c(1-\alpha)y+\bar L_{N-1}(w,y),
$$

其中

$$
\bar L_n(w,y)=h\mathbb E[(q-\zeta_n)^+]+\bar p\mathbb E[(\zeta_n-q)^+].
$$

若 $F_n$ 有密度，则

$$
\frac{d}{dy}\mathbb E[(q-\zeta_n)^+]=F_n(q),
$$

$$
\frac{d}{dy}\mathbb E[(\zeta_n-q)^+]=-[1-F_n(q)].
$$

因此

$$
\phi'(y)=c(1-\alpha)-\bar p+(\bar p+h)F_n(q).
$$

令导数为零，得到

$$
F_n(q)=\frac{\bar p-c(1-\alpha)}{\bar p+h},
$$

也就是 $y=S_n(w)$。同时

$$
\phi''(y)=(\bar p+h)f_n(q)\ge0,
$$

所以最后一期的这一部分确实在 $S_n(w)$ 全局最小。

### 为什么要定义 $H_n$

作者定义

$$
H_n(w,x)=
\begin{cases}
0,&x\le S_n(w),\\
G_{n,N}(w,x,x)-G_{n,N}(w,x,S_n(w)),&x>S_n(w).
\end{cases}
$$

它不是一个纯粹为了证明方便的符号，而是“期初库存已经高于目标水平、又无法通过负订货把库存降回去”造成的额外成本。因此归纳假设可以写成

$$
V_{n,N}(w,x)
=T(w,x)+\sum_{i=n}^{N-1}\alpha^{i-n}\Delta_i+H_n(w,x).
$$

把这个表达式代回 $n-1$ 期 Bellman 方程，再使用同样的 $m_i$ 消去关系，得到

$$
\begin{aligned}
G_{n-1,N}(w,x,y)
={}&c(1-\alpha)y-cx+\bar L_{n-1}(w,y)\\
&+\text{与 }y\text{ 无关的项}
+\alpha\mathbb E[H_n(\widehat w,\widehat x)].
\end{aligned}
$$

现在前半部分已经知道在 $S_{n-1}(w)$ 最小，只需要处理最后的未来额外成本。

### 随机递增假设究竟在哪里用到

记

$$
r=\frac{\bar p-c(1-\alpha)}{\bar p+h}.
$$

因为 $F_{n-1}(z)\ge F_n(z)$，同一分位概率下有

$$
F_{n-1}^{-1}(r)\le F_n^{-1}(r).
$$

这说明后一期的新需求分布向右移动，所以后一期针对新需求的目标库存不会低于前一期。电子附录把进入下一期过量库存区域的需求阈值记为 $\tau_n(w,y)$。在当前选择

$$
y=S_{n-1}(w)
$$

时，上面的分位数关系和 $\beta\cdot\widehat w\ge0$ 共同给出

$$
\tau_n(w,S_{n-1}(w))\le0.
$$

而需求非负，因此能够导致 $\widehat x>S_n(\widehat w)$ 的积分区间为空，于是

$$
\mathbb E[H_n(\widehat w,\widehat x)]=0.
$$

这一步才是随机递增假设在结构证明中的真正作用：它保证“今天订到今天的目标水平”不会在下一期制造一个正的过量库存惩罚。

接下来作者证明，当 $y>S_{n-1}(w)$ 时，$\mathbb E[H_n]$ 非递减。电子附录对带移动上限的积分求导。严格写 Leibniz 公式时本来存在边界项，但边界正好满足

$$
\widehat x=S_n(\widehat w),
$$

根据 $H_n$ 的定义，

$$
H_n(\widehat w,S_n(\widehat w))=0,
$$

所以边界项消失。剩余的积分内导数由归纳假设中“$G_{n,N}$ 在 $S_n$ 右侧非递减”保证非负。

于是整个 $G_{n-1,N}$ 是

$$
\text{在 }S_{n-1}(w)\text{ 最小的凸部分}
+
\text{在该点为零且向右非递减的未来修正}.
$$

两部分同时在 $S_{n-1}(w)$ 取最小值，归纳闭合。这比一句“由凸性可得”更准确地概括了 Theorem 1 的证明。

## 二、无限期证明：哪些结论成立，哪些技术步骤写得偏快

### 折现成本

在新需求独立同分布时，有限期最优策略已经不依赖 $n$。Theorem 2 的任务只是证明有限期问题人为加入的终端价值在 $N\to\infty$ 后消失。

在策略

$$
y_n=\max\{x_n,S(w_n)\}
$$

下，令 $q^*$ 为基库存中针对新需求的分位数，则

$$
x_{n+1}
=y_n-\beta\cdot w_n-\zeta_n
\ge q^*-\zeta_n.
$$

所以

$$
[x_{n+1}]^-
\le(\zeta_n-q^*)^+
\le\zeta_n,
$$

从而若 $\mu=\mathbb E\zeta_n$，

$$
\mathbb E[x_n^-]\le\mu.
$$

作者再用矩阵

$$
P=
\begin{bmatrix}
\beta_1&1-\beta_1&0&\cdots&0\\
\beta_2&0&1-\beta_2&\cdots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
\beta_K&0&0&\cdots&0
\end{bmatrix}
$$

控制保修年龄向量，得到

$$
\mathbb E[w_{n+1}]
\le\mathbb E[w_n]P+2\mu e_1.
$$

在相应非退化条件下，$P$ 是瞬态的次随机矩阵，$P^N\to0$，且

$$
(I-P)^{-1}=I+P+P^2+\cdots.
$$

因此 $\mathbb E[w_N]$ 一致有界。结合积压界，完整终端成本乘 $\alpha^N$ 后趋于零。

这里出版版本有一个可修复的遗漏：Equation (17) 的终端成本包含 $\alpha m_1[x_N]^-$，但 Theorem 2 后面的界只写了 $m\cdot w_N-cx_N$。因为 $\mathbb E[x_N^-]\le\mu$，漏掉的项同样有一致上界，所以不改变极限结论，但证明文本本身少了一项。

### 平均成本与 Foster–Lyapunov 论证

令 $\alpha=1$ 后，基库存简化为

$$
S(w)=\beta\cdot w+F^{-1}\!\left(\frac{p}{p+h}\right).
$$

作者选择 Lyapunov 函数

$$
v(w,x)=|x|+w(I-P)^{-1}e\,b,
$$

其中 $b$ 足够小，使

$$
b<\frac{1}{e_1(I-P)^{-1}e}.
$$

第一项控制库存或积压规模，第二项控制当前在保群体未来可能贡献的累计暴露量。附录分别对 $x\ge0$ 与 $x\le0$ 计算一步漂移。在 $x\ge0$ 时，库存部分产生一个随 $-x$ 下降的项，保修部分产生一个随 $-we$ 下降的项；在 $x\le0$ 时，选择上述 $b$ 可以保证积压规模足够大时漂移仍为负。因此状态远离某个有界区域后，Lyapunov 漂移为负。

这里应当把“论文证明”与“更严格的现代写法”分开。论文直接称链 irreducible、aperiodic、positive recurrent，并把漂移集合称为 finite set；但模型允许连续需求密度，状态也并非天然可数。严格的一般状态空间版本还需要在额外正则条件下证明 $\phi$-irreducibility、aperiodicity，以及某个有界集合是 small/petite set，再由 Foster–Lyapunov 条件推出 positive Harris recurrence。论文引用的 Meyn–Tweedie 理论提供了这条路线，但没有逐项写全。

Proposition 3 再证明单周期成本具有统一的可积性控制，并借助正再生/遍历性质建立长期平均成本。Theorem 3 最终使用

$$
\frac{1}{N+1}\mathbb E[T(w_N,x_N)]\to0
$$

把有限期最优性传到平均成本问题。这里与 Theorem 2 一样，出版证明展开终端项时再次漏写积压对应的未来保修责任；由于积压期望一致有界，这一项除以 $N+1$ 后仍然消失。

## 三、紧急供应版本：为什么临界分位数变了

当缺货不再积压，而是立刻由紧急供应商以单位成本 $p>c$ 补足时，

$$
x_{n+1}=\max\{y_n-\beta\cdot w_n-\zeta_n,0\}.
$$

终端成本中不再需要积压项：

$$
T(w,x)=-cx+m\cdot w.
$$

令 $q=y-\beta\cdot w$，与决策有关的核心成本为

$$
\psi(y)
=cy+(h-c)\mathbb E[(q-\zeta)^+]+p\mathbb E[(\zeta-q)^+].
$$

求导得到

$$
\psi'(y)=c-p+(p+h-c)F(q).
$$

因此

$$
F(q)=\frac{p-c}{p+h-c},
$$

最优水平为

$$
S_n(w)=\beta\cdot w+F_n^{-1}\!\left(\frac{p-c}{p+h-c}\right).
$$

Theorem 4 的归纳结构与 Theorem 1 相同：最后一期先得到凸的临界分位数问题，再定义未来过量库存成本，利用随机递增需求证明该修正在候选点为零、右侧非递减。原文省略了重复的归纳细节，这里不应误认为它引入了新的结构技术。

## 四、三个扩展模型的技术审读

### 按使用时间收费的可再生保修

如果 age-$i$ 产品失效时客户支付 $r_i$，制造商单次替换的净成本变为 $c-r_i$。未来责任递推为

$$
\bar m_i
=(c-r_i)\beta_i+\alpha\beta_i\bar m_1
+\alpha(1-\beta_i)\bar m_{i+1}.
$$

结构与 Proposition 1 相同。因为 $r_i\ge0$，制造商承担的未来保修成本正常应满足

$$
\bar m_1\le m_1.
$$

出版版本却写成 $\bar m_1\ge m_1$。从递推式和经济含义看，这个不等号方向很可能是排版错误。值得注意的是，论文随后关于“按使用时间收费后基库存可以更高”的经济解释并不因此失效：未来保修负担降低会提高今天及时满足需求的相对价值。

### 保修资格随机到期

作者再引入随机比例 $\delta_i$，表示 age-$i$ 的存活产品中仍保持保修资格的比例：

$$
w_{n+1}^{j}=w_n^{j-1}(1-\beta_{j-1})\delta_{j-1}.
$$

Proposition 5 的出版公式存在两个无法仅靠上下文消除的疑点。第一，$\hat m_i$ 被定义为成本，但公式中的 $\hat\theta_i$ 是概率型无量纲量，直接相加会产生量纲不一致。第二，$\delta_i$ 被定义为随机变量，动态规划也对它积分，但 $\hat\theta_i$ 又直接使用 $\delta_i$，没有说明是实现值还是期望值。

如果额外假设各 $\delta_i$ 独立，并令 $\bar\delta_i=\mathbb E\delta_i$，一种自然的重构是

$$
\hat m_i
=c\beta_i+\alpha\beta_i\hat m_1
+\alpha(1-\beta_i)\bar\delta_i\hat m_{i+1}.
$$

但这只是基于模型的一种一致化推导，不是论文原文已经证明的 Proposition 5。阅读时必须把二者分开。

### 随机失效比例

第 8.3 节真正令

$$
\beta(n)=(\beta_1(n),\ldots,\beta_K(n))
$$

随机，因此

$$
D_n=\zeta_n+\beta(n)\cdot w.
$$

作者明确说此前的最优策略结果不再成立，并提出启发式策略

$$
S_n(w)
=F_{n,w}^{-1}\!\left(
\frac{\bar p-c(1-\alpha)}{\bar p+h}
\right),
$$

其中 $F_{n,w}$ 是给定 $w$ 时总需求的分布。

真正破坏原证明的不是“需求多了一个随机项”这么简单。同一个 $\beta(n)$ 同时影响当前替换需求和下一期保修年龄状态，因此当前成本与延续价值受到共同冲击。固定 $\beta$ 时可以借助 $m_i$ 精确完成的线性消去，不再自动成立。这也是主文把“固定失效比例”列为结构性假设而不是普通参数假设的原因。

原文还有一个文字问题：它称所有 $\beta_i(n)$ 为 i.i.d.，同时又允许均值为年龄相关的 $\beta_i$。如果对所有 $i,n$ 真正共同独立同分布，均值不可能随 $i$ 改变。更自然的解释是，对每个固定年龄 $i$，$\{\beta_i(n)\}_n$ 随时间独立同分布，而不同年龄可以具有不同分布。

## 五、数值实验：完整参数、六张表真正回答什么

论文设置 $K=20$、$c=2$、$\alpha=0.95$，新需求每期独立服从 $U[0,100]$，每个实例模拟 100 期并重复 1,000 次。失效比例随年龄递增：

$$
\beta_j=\beta_{j-1}+0.002.
$$

作者报告一共 343 个参数实例，即 $7^3$。正文明确列出 7 个 $p$ 与 7 个 $\beta_1$，但文字中的 $h$ 只列出 0.05 到 0.30 六个值；后面的表和图又出现 $h=0.01$。因此最合理的读法是实验实际使用了 7 个 $h$，正文参数列表漏写了 0.01。

第一类比较是 integrated policy 与 current policy。后者只针对新需求建立基库存，基本忽略保修替换需求。论文报告 343 个实例的平均成本改善为 69.33%，最大为 86.55%。这说明“把保修需求纳入库存计划”本身具有很高价值，但不能把 69.33% 解读为精确年龄信息相对一个成熟保修策略的边际价值。

| $p$ | 14 | 16 | 18 | 20 | 22 | 24 | 26 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Integrated vs. current：平均改善 | 63.29% | 65.86% | 68.00% | 69.85% | 71.43% | 72.84% | 74.07% |
| Integrated vs. approximation：平均改善 | 2.30% | 2.96% | 3.28% | 3.62% | 3.98% | 4.31% | 4.63% |

![论文 Tables 1 与 4 的数据重绘：随着缺货惩罚 p 提高，考虑保修需求的价值和精确年龄信息的价值都上升，但量级完全不同。](/website/figures/huang-2008/cost-improvement-vs-p.svg)

第二类比较是 integrated policy 与一个已经考虑保修需求、但不追踪完整年龄结构的 approximation。论文报告平均改善约 3.6%，最大约 13.1%。因此，**保修信息本身的价值很大，但完整年龄信息的额外价值明显小得多。**

| $\beta_1$ | 0.01 | 0.05 | 0.10 | 0.15 | 0.20 | 0.25 | 0.30 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Integrated vs. current：平均改善 | 22.50% | 61.29% | 75.78% | 79.84% | 81.42% | 82.12% | 82.41% |
| Integrated vs. approximation：平均改善 | 9.95% | 7.00% | 4.07% | 2.22% | 1.20% | 0.64% | 0.36% |

![论文 Tables 3 与 6 的数据重绘：失效水平提高时，考虑保修需求越来越重要，但完整年龄信息相对聚合近似的边际价值快速下降。](/website/figures/huang-2008/value-vs-failure-rate.svg)

Table 6 的下降尤其值得解释。实验把相邻年龄的失效比例差固定为 0.002。当 $\beta_1=0.01$ 时，0.002 是很大的相对差异；当 $\beta_1=0.30$ 时，同样的 0.002 只代表很小的相对异质性。因此随着 $\beta_1$ 增大，年龄结构对预测保修需求的额外信息含量下降，平均失效率近似自然越来越好。

论文还报告，缺货惩罚越高，精确年龄信息越有价值；持有成本的影响则相对弱。这与库存模型的直觉一致：当低估保修需求的代价很高时，更精确的 installed-base information 更有价值。

### 出版表格的一个内部不一致

Table 2 的标题写的是 “Integrated Policy vs. Current Policy”，但其中关于 $h$ 的平均改善只有约 3.5%–3.7%，而且数值几乎与 Table 5 的 “Integrated Policy vs. Approximation” 相同。这与正文报告 integrated policy 相对 current policy 平均改善 69.33% 明显不协调。仅凭出版 PDF 无法可靠恢复 Table 2 原本应有的数据，因此这里不自行猜测或改写，只记录这一内部不一致。

## 六、读完补充材料后应当能回答的问题

如果需要检验自己是否真正掌握了这篇论文，可以不看公式先回答下面几个问题：为什么 $w$ 足以压缩销售历史？为什么主模型中的 $\beta\cdot w$ 在给定状态后不是随机需求？为什么终端成本中既有 $m\cdot w$ 又有 $m_1[x]^-$？为什么 $\bar p$ 小于原来的 $p$？为什么 Theorem 1 不依赖完整目标函数的全局凸性？随机递增假设到底用在归纳证明哪一步？为什么独立同分布新需求会让有限期策略也平稳？无限期折现证明真正需要控制哪些状态量？平均成本证明还缺哪些一般状态空间条件？为什么随机 $\beta(n)$ 使原来的消去结构失效？最后，69.33% 与 3.6% 分别衡量什么价值？

如果这些问题都能独立回答，才算真正掌握了 Huang et al. (2008) 的理论骨架和实验含义，而不是只记住一个基库存公式。

[返回主精读](/website/notes/paper-reading-huang-2008/)
