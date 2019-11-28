<?php
/**
 * A basic template that uses the events widget
 *
 * PHP version 7^.0
 *
 * @category   Events
 * @package    Cwd_Events/cornell_base
 * @subpackage Cwd_Events/page-templater
 * @author     philwilliammee <psw58@cornell.edu>
 * @license    gpl3.0 https://www.gnu.org/licenses/gpl-3.0.en.html
 * @link       philwilliammee.com
 * @since      1.0.0
 */

get_header();

?>

	<div id="content" role="main" aria-label="Main Content">
		<div id="main">
			<div id="main-top"></div>
			<?php if ( is_active_sidebar( 'sidebar-3' ) ) { ?>
				<div id="secondary-nav">
					<div class="main-body">
						<?php get_sidebar(); ?>
					</div>
				</div>
			<?php } ?>

			<div id="main-body">
				<?php
				if ( function_exists( 'dimox_breadcrumbs' ) ) {
					dimox_breadcrumbs();
				}
				?>
				<?php /* The loop */ ?>
				<?php
				while ( have_posts() ) :
					the_post();
					?>

					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

						<header class="entry-header">
							<?php if ( has_post_thumbnail() && ! post_password_required() ) : ?>
							<div class="entry-thumbnail">
								<?php the_post_thumbnail(); ?>
							</div>
							<?php endif; ?>
							<h1 class="entry-title"><?php the_title(); ?></h1>
						</header><!-- .entry-header -->

						<div class="entry-content">
							<!-- Remove the content for testing -->
							<?php the_content(); ?>

							<?php
							if ( is_active_sidebar( 'cwd-events-page-after-content-widget-area' ) ) :
								?>
								<aside class="cwd-events-page-after-content-widget-area">
									<?php dynamic_sidebar( 'cwd-events-page-after-content-widget-area' ); ?>
								</aside>
							<?php endif; ?>

							<?php wp_link_pages( array( 'before' => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'cornell_base' ) . '</span>', 'after' => '</div>', 'link_before' => '<span>', 'link_after' => '</span>' ) ); ?>
						</div><!-- .entry-content -->

					</article><!-- #post -->

					<footer class="entry-meta">
						<?php //edit_post_link( __( 'Edit', 'cornell_base' ), '<span class="edit-link">', '</span>' ); ?>
					</footer><!-- .entry-meta -->

					<?php comments_template(); ?>

				<?php endwhile; ?>
			</div><!-- end #main-body -->

			<?php if ( is_active_sidebar( 'sidebar-4' ) ) { ?>
				<div id="secondary">
					<div class="main-body">
						<?php get_sidebar('secondary'); ?>
					</div>
				</div>
			<?php } ?>

			<div id="main-bottom"></div>

		</div><!-- #main -->

	</div><!-- #content -->

</div><!-- #content-wrap -->
</div><!-- end #wrap -->


<?php if ( is_active_sidebar( 'sidebar-5' ) ) : ?>
	<div class="colorband tint-one">
		<div class="colorband-content">
			<?php if ( get_theme_mod('section_one') != '' ) : ?><h2 class="section-title"><span><?php echo get_theme_mod('section_one', 'Section One'); ?></span></h2><?php endif; ?>
			<div class="columns">
				<?php dynamic_sidebar( 'sidebar-5' ); ?>
			</div>
		</div>
	</div>
<?php endif; ?>

<?php if ( is_active_sidebar( 'sidebar-6' ) ) : ?>
	<div class="colorband tint-two">
		<div class="colorband-content">
			<?php if ( get_theme_mod('section_two') != '' ) : ?><h2 class="section-title"><span><?php echo get_theme_mod('section_two', 'Section Two'); ?></span></h2><?php endif; ?>
			<div class="columns">
				<?php dynamic_sidebar( 'sidebar-6' ); ?>
			</div>
		</div>
	</div>
<?php endif; ?>

<?php if ( is_active_sidebar( 'sidebar-7' ) ) : ?>
	<div class="colorband tint-three">
		<div class="colorband-content">
			<?php if ( get_theme_mod('section_three') != '' ) : ?><h2 class="section-title"><span><?php echo get_theme_mod('section_three', 'Section Three'); ?></span></h2><?php endif; ?>
			<div class="columns">
				<?php dynamic_sidebar( 'sidebar-7' ); ?>
			</div>
		</div>
	</div>
<?php endif; ?>
<?php get_footer(); ?>
